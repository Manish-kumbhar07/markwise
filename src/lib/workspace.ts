import { prisma } from './prisma.ts';
import {
  DEMO_USER_EMAIL,
  DEMO_USER_ID,
  DEMO_WORKSPACE_ID,
} from './workspace-constants.ts';

export { DEMO_USER_EMAIL, DEMO_USER_ID, DEMO_WORKSPACE_ID };

export async function getOrCreateDemoWorkspace() {
  return prisma.$transaction(async (transaction) => {
    const workspace = await transaction.workspace.upsert({
      where: { id: DEMO_WORKSPACE_ID },
      update: {},
      create: {
        id: DEMO_WORKSPACE_ID,
        name: 'Demo Workspace',
      },
    });

    await transaction.user.upsert({
      where: { email: DEMO_USER_EMAIL },
      update: { workspaceId: DEMO_WORKSPACE_ID },
      create: {
        id: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
        workspaceId: DEMO_WORKSPACE_ID,
      },
    });

    return workspace;
  });
}
