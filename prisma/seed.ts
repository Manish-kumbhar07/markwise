import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  const wsId = 'demo-workspace';

  // Create the workspace before its demo user because the user references it.
  await prisma.workspace.upsert({
    where: { id: wsId },
    update: {},
    create: {
      id: wsId,
      name: 'Demo Workspace',
    },
  });
  await prisma.user.upsert({
    where: { email: 'demo@markwise.ai' },
    update: { workspaceId: wsId },
    create: {
      id: 'demo-user-1',
      email: 'demo@markwise.ai',
      workspaceId: wsId,
    },
  });

  // Seed Rules
  const existingRules = await prisma.rule.findMany({ where: { workspaceId: wsId } });
  if (existingRules.length === 0) {
    await prisma.rule.createMany({
      data: [
        {
          id: 'rule_br014',
          workspaceId: wsId,
          title: 'Absolute Security & Guarantee Claims',
          type: 'CLAIM',
          severity: 'HIGH',
          definition:
            'Prohibits unqualified guarantees of immunity from fraud, security breaches, or 100% financial returns without accompanying regulatory disclaimer and partner bank disclosure.',
          version: 1,
        },
        {
          id: 'rule_br021',
          workspaceId: wsId,
          title: 'Unsubstantiated Performance Metrics',
          type: 'CLAIM',
          severity: 'MEDIUM',
          definition:
            'Requires any percentage improvement or speed claim exceeding 50% to link directly to an approved benchmark or peer-reviewed study in the Fact Vault.',
          version: 2,
        },
        {
          id: 'rule_br009',
          workspaceId: wsId,
          title: 'Aggressive or Hype-Driven Buzzwords',
          type: 'BANNED_WORD',
          severity: 'LOW',
          definition:
            'Avoid hyperbolic marketing colloquialisms such as magic, game-changing revolution, and foolproof. Substitute with concrete, technical functionality statements.',
          version: 1,
        },
      ],
    });
    console.log('Seeded initial rules to the database');
  }

  // Seed Facts
  const existingFacts = await prisma.fact.findMany({ where: { workspaceId: wsId } });
  if (existingFacts.length === 0) {
    await prisma.fact.createMany({
      data: [
        {
          id: 'fact_fv801',
          workspaceId: wsId,
          claim: '99.99% platform uptime guaranteed across all enterprise tier SLAs.',
          evidenceSource: 'Enterprise Master Services Agreement §1.3 (SLA Exhibit B)',
          expiryDate: new Date('2027-12-31T23:59:59Z'),
          status: 'Valid',
        },
        {
          id: 'fact_fv802',
          workspaceId: wsId,
          claim:
            'Customer deposits are eligible for FDIC pass-through coverage up to $250,000 via partner bank custodial accounts.',
          evidenceSource: 'FDIC Custodial Placement Filing 12 CFR §330.5',
          expiryDate: new Date('2026-06-30T23:59:59Z'),
          status: 'Valid',
        },
        {
          id: 'fact_fv803',
          workspaceId: wsId,
          claim: 'Zero liability for unauthorized point-of-sale card transactions under Visa network rules.',
          evidenceSource: 'Visa Global Operating Regulations Q2 2024 (Superseded)',
          expiryDate: new Date('2024-12-31T23:59:59Z'),
          status: 'Expired',
        },
      ],
    });
    console.log('Seeded initial facts to the database');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
