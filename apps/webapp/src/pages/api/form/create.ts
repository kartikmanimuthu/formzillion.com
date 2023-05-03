import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma";
import { showErrorToast } from "@/ui/Toast/Toast";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, teamSlug, sendToEmail } = JSON.parse(req.body);

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const { data } = await supabase.auth.getSession();
    const email = data?.session?.user?.email;

    const user: any = await prisma.users.findFirst({
      where: { email },
      include: {
        teams: {
          where: { slug: teamSlug },
          select: {
            id: true,
          },
        },
      },
    });

    const emails = sendToEmail.includes(",")
      ? sendToEmail.split(",")
      : [sendToEmail];

    const teamId = user?.teams[0]?.id;
    const form = await prisma.forms.create({
      data: {
        name,
        email,
        formEnabled: true,
        emailNotifications: true,
        sendToEmail: emails,
        autoResponder: false,
        autoResponderConfig: {},
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });

    /* Creating a Default Workflow for created Form */
    await prisma.workflows.create({
      data: {
        formId: form.id,
        teamId: teamId,
        userId: user.id,
        name: `${name} Flow`,
        status: "active",
      },
    });

    res.status(201).json({ success: true, data: form });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
