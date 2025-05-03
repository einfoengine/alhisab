'use client'
import { useState } from "react";

const journalEntries = [
  {
    id: 1,
    date: "2025-05-01",
    title: "Office Supplies Purchase",
    description: "Purchased office supplies from vendor.",
    from: "Cash Account",
    to: "Supplies Account",
    debit: "$500",
    credit: "$500",
    method: "Cash",
    purpose: "Office Supplies",
    tags: "Office, Supplies",
  },
  {
    id: 2,
    date: "2025-05-02",
    title: "Client Payment",
    description: "Received payment from client.",
    from: "Accounts Receivable",
    to: "Cash Account",
    debit: "$1000",
    credit: "$1000",
    method: "Bank",
    purpose: "Payment",
    tags: "Client, Payment",
  },
];

export default function JournalPage() {
  const [entries, setEntries] = useState(journalEntries);
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    title: "",
    description: "",
    from: "",
    to: "",
    debit: "",
    credit: "",
    method: "",
    purpose: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, { ...formData, id: entries.length + 1 }]);
    setFormData({ id: "", date: "", title: "", description: "", from: "", to: "", debit: "", credit: "", method: "", purpose: "", tags: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="From"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="To"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <select
            name="debit"
            value={formData.debit}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="0">Debit</option>
            <option value="1">Credit</option>
          </select>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Amount"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Bikash">Bikash</option>
            <option value="Chaque">Chaque</option>
          </select>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Entry
        </button>
      </form>

      <div className="flex font-semibold text-gray-700 border-b pb-2">
        <span className="w-1/11">ID</span>
        <span className="w-1/11">Date</span>
        <span className="w-1/11">Title</span>
        <span className="w-1/6">Description</span>
        <span className="w-1/11">From</span>
        <span className="w-1/11">To</span>
        <span className="w-1/11">Amount</span>
        <span className="w-1/11">Type</span>
        <span className="w-1/11">Method</span>
        <span className="w-1/11">Purpose</span>
        <span className="w-1/11">Tags</span>
      </div>
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between border-b pb-2">
            <span className="w-1/11 text-gray-600">{entry.id}</span>
            <span className="w-1/11 text-gray-600">{entry.date}</span>
            <span className="w-1/11 text-gray-600">{entry.title}</span>
            <span className="w-1/6 text-gray-600">{entry.description}</span>
            <span className="w-1/11 text-gray-600">{entry.from}</span>
            <span className="w-1/11 text-gray-600">{entry.to}</span>
            <span className="w-1/11 text-gray-600">{entry.debit || entry.credit}</span>
            <span className="w-1/11 text-gray-600">{entry.debit ? "Debit" : "Credit"}</span>
            <span className="w-1/11 text-gray-600">{entry.method}</span>
            <span className="w-1/11 text-gray-600">{entry.purpose}</span>
            <span className="w-1/11 text-gray-600">{entry.tags}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}