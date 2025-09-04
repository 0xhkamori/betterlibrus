import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedClient } from "@/lib/librus-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await getAuthenticatedClient(req);
    if (!client) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountInfo = await client.info.getAccountInfo();
    console.log('📊 Full account info received:', JSON.stringify(accountInfo, null, 2));

    let userInfo: any = {};
    try {
      if (client.info.getUser && typeof client.info.getUser === 'function') {
        userInfo = await client.info.getUser();
        console.log('👤 User info received:', JSON.stringify(userInfo, null, 2));
      }
    } catch (userError: any) {
      console.log('⚠️ Could not get user info:', userError?.message || 'Unknown error');
    }

    let studentInfo: any = {};
    try {
      if (client.info.getStudentInfo && typeof client.info.getStudentInfo === 'function') {
        studentInfo = await client.info.getStudentInfo();
        console.log('🎓 Student info received:', JSON.stringify(studentInfo, null, 2));
      }
    } catch (studentError: any) {
      console.log('⚠️ Could not get student info:', studentError?.message || 'Unknown error');
    }

    const accountData = accountInfo as any;
    const studentData = accountData?.student || {};
    const accountInfoData = accountData?.account || {};

    const combinedUserData = {
      email: accountInfoData?.login || null,
      name: studentData?.nameSurname || accountInfoData?.nameSurname || null,
      id: studentData?.index || null,
      firstName: null as string | null,
      lastName: null as string | null,
      phone: userInfo?.phone || userInfo?.phoneNumber || null,
      address: userInfo?.address || null,
      class: studentData?.class || null,
      studentId: studentData?.index || null,
      enrollmentDate: studentInfo?.enrollmentDate || null,
      educator: studentData?.educator || null,
      fullName: studentData?.nameSurname || accountInfoData?.nameSurname || null
    };

    if (combinedUserData.fullName && combinedUserData.fullName.includes(' ')) {
      const nameParts = combinedUserData.fullName.split(' ');
      combinedUserData.firstName = nameParts[0];
      combinedUserData.lastName = nameParts.slice(1).join(' ');
    }

    console.log('✨ Final combined user data:', JSON.stringify(combinedUserData, null, 2));

    return res.status(200).json({ 
      success: true, 
      user: combinedUserData,
      debug: {
        accountInfo,
        userInfo,
        studentInfo
      }
    });
  } catch (error: any) {
    console.error('🔥 User API error:', error);
    return res.status(500).json({ message: error.message || "An error occurred." });
  }
}
