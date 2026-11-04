import React from 'react';
import { prisma } from '../../../lib/prisma';
import { createRuleAction, DEFAULT_WORKSPACE_ID } from '../../../actions/rules';

export default async function BrandBrainRulesPage() {
  const rules = await prisma.rule.findMany({
    where: { workspaceId: DEFAULT_WORKSPACE_ID },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Brand Brain Rules</h1>
          <p className="text-gray-600">Enterprise guidelines and invariants</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {rules.length} Rules Active
        </span>
      </div>

      <form action={createRuleAction} className="p-4 bg-white rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Create New Rule</h2>
        <input type="hidden" name="workspaceId" value={DEFAULT_WORKSPACE_ID} />
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            required
            className="w-full mt-1 p-2 border rounded"
            placeholder="e.g. Unsubstantiated Performance Claims"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select name="type" className="w-full mt-1 p-2 border rounded">
              <option value="CLAIM">CLAIM</option>
              <option value="TONE">TONE</option>
              <option value="BANNED_WORD">BANNED_WORD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Severity</label>
            <select name="severity" className="w-full mt-1 p-2 border rounded">
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Definition</label>
          <textarea
            name="definition"
            required
            rows={3}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Provide rule definition and enforcement scope"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-700 text-white font-medium rounded hover:bg-emerald-800"
        >
          Create Rule
        </button>
      </form>

      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4 bg-white rounded-lg shadow border-l-4 border-l-emerald-600">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-gray-500 uppercase">{rule.type} · {rule.severity}</span>
                <h3 className="text-lg font-semibold">{rule.title}</h3>
                <p className="text-gray-700 mt-1">{rule.definition}</p>
              </div>
              <span className="text-xs text-gray-400">v{rule.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
