import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { seatingLayoutValidationSchema } from 'validationSchema/seating-layouts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.seating_layout
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSeatingLayoutById();
    case 'PUT':
      return updateSeatingLayoutById();
    case 'DELETE':
      return deleteSeatingLayoutById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSeatingLayoutById() {
    const data = await prisma.seating_layout.findFirst(convertQueryToPrismaUtil(req.query, 'seating_layout'));
    return res.status(200).json(data);
  }

  async function updateSeatingLayoutById() {
    await seatingLayoutValidationSchema.validate(req.body);
    const data = await prisma.seating_layout.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSeatingLayoutById() {
    const data = await prisma.seating_layout.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
