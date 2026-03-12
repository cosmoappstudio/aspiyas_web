import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      sector,
      budget,
      service,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ad Soyad, E-posta ve Mesaj zorunludur." },
        { status: 400 }
      );
    }

    const html = `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>Şirket:</strong> ${company || "-"}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || "-"}</p>
      <p><strong>Sektör:</strong> ${sector || "-"}</p>
      <p><strong>Ortalama Reklam Bütçesi:</strong> ${budget || "-"}</p>
      <p><strong>İlgilendiği Hizmet:</strong> ${service || "-"}</p>
      <hr />
      <p><strong>Mesaj:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Aspiyas İletişim <hello@aspiyas.com>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ["hello@aspiyas.com", "gokturk@aspiyas.com"],
      replyTo: email,
      subject: `Yeni Lead - Aspiyas: ${company || name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "E-posta gönderilemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
