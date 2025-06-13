import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  image?: string;
  pricing?: {
    unit_price: number;
    max_discount?: number;
  };
}

interface ProductsListProps {
  services: Product[];
  onProductClick?: (id: string) => void;
}

export default function ProductsList({ services, onProductClick }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((service) => {
        const card = (
          <div
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group cursor-pointer"
            onClick={() => onProductClick?.(service.id)}
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{service.name}</h2>
              {service.shortDescription && (
                <p className="text-gray-500 text-sm mb-2">{service.shortDescription}</p>
              )}
              {service.pricing && (
                <div className="text-blue-600 font-bold text-base">
                  ${service.pricing.unit_price.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        );
        return onProductClick ? (
          <div key={service.id}>{card}</div>
        ) : (
          <Link key={service.id} href={`/dashboard/services/${service.id}`}>{card}</Link>
        );
      })}
    </div>
  );
} 