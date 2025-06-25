"use client";

import { useParams } from "next/navigation";
import agreements from "@/data/agreements.json";
import clients from "@/data/clients.json";
import projects from "@/data/projects.json";
import Image from "next/image";
import services from "@/data/services.json";
import packages from "@/data/packages.json";

export default function AgreementDetailsPage() {
  const params = useParams();
  const agreementId = params?.agreement_id as string;
  const agreement = agreements.find((a) => a.agreement_id === agreementId);

  if (!agreement) {
    return <div className="p-6">Agreement not found.</div>;
  }

  const project = projects.projects.find((p) => p.id === agreement.project_id);
  const clientParty = agreement.parties.find((p) => p.type === "client");
  const client = clients.find((c) => c.id === clientParty?.client_id);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agreement Details</h1>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => alert('Download PDF feature coming soon!')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
          Download
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Agreement Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Agreement ID</p>
              <p className="font-medium">{agreement.agreement_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reference</p>
              <p className="font-medium">{agreement.agreement_referance || 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Agreement Date</p>
              <p className="font-medium">{new Date(agreement.agreement_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Project</p>
              <p className="font-medium">{project?.name || agreement.project_id}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Client</h2>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium text-gray-900">{client?.client_name || clientParty?.name}</span>
            {client?.avatar && (
              <Image src={client.avatar} alt={client.client_name} width={32} height={32} className="rounded-full" />
            )}
          </div>
          <div className="text-sm text-gray-600">{typeof client?.address === 'string' ? client.address : clientParty?.address && typeof clientParty.address === 'string' ? clientParty.address : ''}</div>
          <div className="text-sm text-gray-600">{clientParty?.email}</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Service Provider</h2>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium text-gray-900">VibelyDigital</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Scope of Work</h2>
          <div className="mb-2">
            <span className="font-medium">{agreement.scope_of_work.project_title}</span>
            <div className="text-sm text-gray-600">{agreement.scope_of_work.description}</div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Start:</span> {agreement.scope_of_work.start_date} <span className="font-medium ml-4">End:</span> {agreement.scope_of_work.end_date}
          </div>
          <div className="mt-2">
            <h3 className="font-semibold mb-2">Deliverables</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 border">Name</th>
                    <th className="px-3 py-2 border">Type</th>
                    <th className="px-3 py-2 border">Price</th>
                    <th className="px-3 py-2 border">Discount</th>
                    <th className="px-3 py-2 border">Discounted Price</th>
                    <th className="px-3 py-2 border">Repeat Time</th>
                  </tr>
                </thead>
                <tbody>
                  {agreement.scope_of_work.deliverables.map((d) => {
                    let name = '', price = 0, discount = 0, discounted = 0, repeat = '-';
                    if (d.type === 'service' && 'service_id' in d) {
                      const s = services.services.find(s => s.id === d.service_id);
                      if (s && s.pricing) {
                        name = s.name;
                        price = s.pricing.unit_price;
                        discount = s.pricing.max_discount || 0;
                        discounted = price - (price * (discount / 100));
                        repeat = s.minimum_time_required ? `${s.minimum_time_required} days` : '-';
                      }
                    } else if (d.type === 'package' && 'package_id' in d) {
                      const p = packages.packages.find(p => p.id === d.package_id);
                      if (p && p.pricing) {
                        name = p.name;
                        price = p.pricing.unit_price;
                        discount = p.pricing.max_discount || 0;
                        discounted = price - (price * (discount / 100));
                        repeat = p.billing_cycle || '-';
                      }
                    }
                    return (
                      <tr key={d.deliverable_id}>
                        <td className="border px-3 py-2">{name}</td>
                        <td className="border px-3 py-2">{d.type}</td>
                        <td className="border px-3 py-2">${price}</td>
                        <td className="border px-3 py-2">{discount}%</td>
                        <td className="border px-3 py-2">${discounted}</td>
                        <td className="border px-3 py-2">{repeat}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Payment Terms</h2>
          <div className="text-sm text-gray-600">Pricing Structure: {agreement.payment_terms.pricing_structure}</div>
          <div className="text-sm text-gray-600">Total Cost: ${agreement.payment_terms.total_cost.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Deposit: ${agreement.payment_terms.deposit_amount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Payment Methods: {agreement.payment_terms.payment_methods.join(', ')}</div>
        </div>
      </div>
    </div>
  );
} 