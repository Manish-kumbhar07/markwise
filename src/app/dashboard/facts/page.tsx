import React from 'react';
import { prisma } from '../../../lib/prisma';
import { createFactAction, DEFAULT_WORKSPACE_ID } from '../../../actions/facts';

export default async function FactVaultFactsPage() {
  const facts = await prisma.fact.findMany({
    where: { workspaceId: DEFAULT_WORKSPACE_ID },
    orderBy: { expiryDate: 'asc' },
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Fact Vault</h1>
          <p className="text-gray-600">Verified evidence repository</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {facts.length} Verified Facts
        </span>
      </div>

      <form action={createFactAction} className="p-4 bg-white rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Add New Fact</h2>
        <input type="hidden" name="workspaceId" value={DEFAULT_WORKSPACE_ID} />
        <div>
          <label className="block text-sm font-medium">Claim Statement</label>
          <input
            name="claim"
            required
            className="w-full mt-1 p-2 border rounded"
            placeholder="e.g. 99.99% platform uptime SLA guaranteed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Evidence Source</label>
          <input
            name="evidenceSource"
            required
            className="w-full mt-1 p-2 border rounded"
            placeholder="e.g. Enterprise Master Services Agreement Exhibit B"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              name="expiryDate"
              type="date"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" className="w-full mt-1 p-2 border rounded">
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-700 text-white font-medium rounded hover:bg-emerald-800"
        >
          Add Fact
        </button>
      </form>

      <div className="grid gap-4">
        {facts.map((fact) => (
          <div key={fact.id} className="p-4 bg-white rounded-lg shadow border-l-4 border-l-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{fact.claim}</h3>
                <p className="text-sm text-gray-600 mt-1">Source: {fact.evidenceSource}</p>
                <p className="text-xs text-gray-500 mt-0.5">Expires: {new Date(fact.expiryDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${fact.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {fact.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
