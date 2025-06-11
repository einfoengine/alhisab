'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TableBuilder from '@/components/TableBuilder';
import PageHeader from '@/components/elements/PageHeader';
import packages from '@/data/packages.json';
import services from '@/data/services.json';

type Package = {
  id: string;
  name: string;
  description: string;
  services: string[];
  billing_cycle: string;
  features: string[];
};

const PackagesPage = () => {
  const router = useRouter();

  const calculatePackagePrice = (packageServices: string[]) => {
    return packageServices.reduce((total, serviceId) => {
      const service = services.services.find(s => s.id === serviceId);
      return total + (service?.pricing.unit_price || 0);
    }, 0);
  };

  const calculateDiscount = (price: number, billingCycle: string) => {
    const baseDiscount = 0.10; // 10% base discount
    const yearlyDiscount = billingCycle === 'yearly' ? 0.15 : 0; // Additional 15% for yearly
    return price * (baseDiscount + yearlyDiscount);
  };

  const handleRowClick = (packageId: string) => {
    router.push(`/dashboard/packages/${packageId}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'Package Name',
      sortable: true,
      render: (_value: unknown, item: Package) => (
        <div 
          className="font-medium text-blue-600 cursor-pointer hover:text-blue-800"
          onClick={() => handleRowClick(item.id)}
        >
          {item.name}
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      sortable: true,
    },
    {
      key: 'services',
      label: 'Services',
      render: (_value: unknown, item: Package) => (
        <div className="flex flex-wrap gap-1">
          {item.services.map(serviceId => {
            const service = services.services.find(s => s.id === serviceId);
            return service ? (
              <span 
                key={serviceId}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {service.name}
              </span>
            ) : null;
          })}
        </div>
      ),
    },
    {
      key: 'billing_cycle',
      label: 'Billing Cycle',
      sortable: true,
      render: (value: unknown) => (
        <span className="capitalize">{value as string}</span>
      ),
    },
    {
      key: 'price',
      label: 'Original Price',
      sortable: true,
      render: (_value: unknown, item: Package) => {
        const price = calculatePackagePrice(item.services);
        return `$${price.toLocaleString()}`;
      },
    },
    {
      key: 'discount',
      label: 'Discount',
      sortable: true,
      render: (_value: unknown, item: Package) => {
        const price = calculatePackagePrice(item.services);
        const discount = calculateDiscount(price, item.billing_cycle);
        const discountPercentage = item.billing_cycle === 'yearly' ? '25%' : '10%';
        return (
          <div className="text-green-600">
            {discountPercentage} (${discount.toLocaleString()})
          </div>
        );
      },
    },
    {
      key: 'final_price',
      label: 'Final Price',
      sortable: true,
      render: (_value: unknown, item: Package) => {
        const price = calculatePackagePrice(item.services);
        const discount = calculateDiscount(price, item.billing_cycle);
        const finalPrice = price - discount;
        return (
          <div className="font-semibold">
            ${finalPrice.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">
              /{item.billing_cycle}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="nt-page">
      <main>
        <PageHeader title="Packages" />
        <div className="nt-page-content">
          <div className="nt-page-content-body">
            <TableBuilder<Package>
              columns={columns}
              data={packages.packages}
              onRowClick={(item) => handleRowClick(item.id)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PackagesPage; 