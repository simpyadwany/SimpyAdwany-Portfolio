import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequestBody {
  message?: string;
  sessionId?: string;
}

function generateReply(message: string): string {
  const msg = message.toLowerCase().trim();

  if (!msg) {
    return "I'd be happy to help! You can ask me about Simpy's experience, projects, technical skills, or how to get in touch.";
  }

  if (/hello|hi|hey|greeting/.test(msg)) {
    return "Hello! I'm Simpy Adwany's AI assistant. I can tell you about his 21+ years of experience in network management, video surveillance, and systems programming. What would you like to know?";
  }

  if (/experience|years|background|career|summary/.test(msg)) {
    return "Simpy is a Technical professional with 21+ years of experience in software development, technical leadership, network management systems, and video surveillance technologies. He is currently designated as Technical Director at Spanidea (since Feb 2018), functioning as a hands-on Technical Lead responsible for architecture, design, development, customer communication, team mentoring, release ownership, and project delivery. Previously, he was Technical Lead at Canon India Pvt Ltd (Jul 2005 — Jan 2018). He holds a B.Tech (IT) from MNIT Jaipur and is based in Bengaluru, India.";
  }

  if (/project|work|portfolio|case study/.test(msg)) {
    return "Simpy has delivered 11+ notable projects across his career:\n\n• SAR-HM SNMP Collector — monitoring solution for Nokia devices with SNMP/MQTT telemetry\n• OpenWISP Test Automation Framework — centralized test management for network devices\n• Qortex Client & Server — enterprise 3D LiDAR sensor management platform\n• QGuard / QView — 3D visualization for autonomous vehicle sensors\n• Ichigo ONVIF Stack — ONVIF-compliant firmware for surveillance cameras\n• Medical Document Library — HL7 CDA compliant C++ library for healthcare\n• XSL-FO Processor — XML framework for HL7 medical documents\n• Whiteboard Linux Porting — cross-platform whiteboard application\n• Whiteboard Application — multimedia interactive whiteboard\n• Virtual Printer Driver — Windows/Linux printer drivers\n• Group Collaboration System (GCS) — enterprise screen sharing & remote control\n\nCheck out the Projects page for detailed case studies!";
  }

  if (/skill|tech|stack|technology|tool/.test(msg)) {
    return "Simpy's technical expertise spans:\n\n• Core Technology: C, C++, C++11/14/17, Python, Qt/QML, C#, STL, Boost\n• Cloud & Platforms: Linux, Windows, Docker\n• Networking & Protocols: SNMP, MQTT, ONVIF, TCP/IP, SOAP, WSDL, gSOAP, REST APIs\n• Tools & Methodologies: Git, SVN, Jenkins, CMake, Visual Studio, Eclipse, GDB, WinDbg, Wireshark, Valgrind, SoapUI, CUnit, CppUnit, Parasoft, Design Patterns, Postman";
  }

  if (/contact|reach|email|hire|available|work with/.test(msg)) {
    return "You can reach Simpy at simpy.adwany@gmail.com. He is based in Bengaluru, India. You can also use the contact form on this site, and he will get back to you. Download his resume from the navigation bar for a full breakdown of his experience!";
  }

  if (/resume|cv|download/.test(msg)) {
    return "You can download Simpy's full resume using the 'Resume' button in the navigation bar or the footer. It contains a detailed breakdown of his 21+ years of experience, all 11 projects, skills, and employment history.";
  }

  if (/lead|manage|team|mentor|responsib/.test(msg)) {
    return "Simpy functions as a hands-on Technical Lead, owning architecture, design, development, customer communication, team mentoring, release ownership, and project delivery. He leads small engineering teams — for example, a team of 4 engineers on the SAR-HM SNMP collector project. His approach combines deep technical involvement with code reviews, mentoring, and direct customer engagement to ensure successful delivery.";
  }

  if (/snmp|mqtt|network|monitoring|telemetry|nokia/.test(msg)) {
    return "Simpy designed the SAR-HM SNMP Collector — a monitoring solution for Nokia SAR-HM devices that collects SNMP data, processes KPIs, and publishes telemetry to an MQTT broker for storage in InfluxDB. He designed the overall architecture and KPI collection framework, developed the SNMP polling, KPI processing, and MQTT publishing modules, and defined the KPI mapping and MQTT payload structure. The project was built in Python on Linux. Check the Projects page for the full case study!";
  }

  if (/onvif|camera|surveillance|video|firmware/.test(msg)) {
    return "Simpy developed ONVIF-compliant firmware for network video surveillance cameras (Project Ichigo) at Canon India, ensuring interoperability with third-party ONVIF clients and devices. The work involved C, Python, gSOAP, SOAP, WSDL, and tools like Wireshark, Valgrind, and SoapUI. He built automation tools and test frameworks, generated code coverage and memory leak reports, and managed customer support, releases, and team mentoring. Read his blog post 'Lessons from Developing ONVIF-Compliant Camera Firmware' for more!";
  }

  if (/lidar|qortex|qguard|autonomous|sensor|3d|point cloud/.test(msg)) {
    return "Simpy led development of Qortex — an enterprise application for managing 3D LiDAR sensors, visualizing point cloud data, defining monitoring zones, and configuring rules for object detection and event recording. He also worked on QGuard/QView, a 3D visualization platform for autonomous vehicle sensors. Both projects used C++ (including C++11/14/17), Qt/QML, Boost, CMake, and Jenkins across Linux and Windows.";
  }

  if (/medical|hl7|health|cda|document/.test(msg)) {
    return "Simpy developed a reusable C++ library for generating HL7 CDA compliant XML medical documents used by healthcare applications. He built the Procedure Note, Operative Note, and Diagnostic Imaging modules and designed reusable APIs for document generation. He also developed an XSL-FO Processor that transformed HL7 medical documents into XSL-FO and ODF formats for viewing, printing, and storage. Both projects were done at Canon India.";
  }

  if (/blog|article|write|post/.test(msg)) {
    return "Simpy writes about network management, video surveillance, and systems programming. Recent posts include:\n\n• 'Building SNMP-Based Network Monitoring with MQTT Telemetry'\n• 'Lessons from Developing ONVIF-Compliant Camera Firmware'\n• '21 Years of Systems Programming: C++ Across Domains'\n\nVisit the Blog page to read them in full!";
  }

  if (/service|offer|help with|consult/.test(msg)) {
    return "Simpy specializes in four areas:\n\n1. Network Management Systems — SNMP monitoring, KPI collection, MQTT telemetry pipelines\n2. Video Surveillance & ONVIF — ONVIF-compliant firmware for network cameras\n3. Enterprise Software Development — cross-platform C++/Qt/Python applications\n4. Technical Leadership — architecture, mentoring, releases, customer communication\n\nUse the contact form to discuss your specific needs!";
  }

  if (/education|degree|college|b\.tech|mnit|jaipur/.test(msg)) {
    return "Simpy holds a B.Tech in Information Technology from MNIT Jaipur (Malaviya National Institute of Technology Jaipur).";
  }

  if (/location|where|based|live|bengaluru|bangalore/.test(msg)) {
    return "Simpy is based in Bengaluru, India. He has experience working with global customers including Nokia and has led distributed collaboration throughout his career.";
  }

  if (/spanidea|canon|company|employer/.test(msg)) {
    return "Simpy has worked at two companies:\n\n1. Spanidea (Feb 2018 — Present) as Technical Director — Automotive & Application Software, leading network management, 3D LiDAR, and autonomous vehicle visualization projects.\n2. Canon India Pvt Ltd (Jul 2005 — Jan 2018) as Technical Lead, developing ONVIF firmware, medical document libraries, XSL-FO processors, and interactive whiteboard applications over 12+ years.";
  }

  if (/thank/.test(msg)) {
    return "You're welcome! Feel free to explore the projects, blog, or reach out via the contact page. Is there anything else you'd like to know about Simpy?";
  }

  if (/whiteboard|printer|driver|collaboration|gcs/.test(msg)) {
    return "At Canon India, Simpy worked on several desktop/systems projects:\n\n• Whiteboard Application — interactive multimedia whiteboard (C++, Qt, Windows)\n• Whiteboard Linux Porting — ported the whiteboard from Windows to Linux (C++, Qt, X11)\n• Virtual Printer Driver — Windows and Linux printer drivers for whiteboard integration (C, WinDDK, CUPS)\n• Group Collaboration System (GCS) — enterprise collaboration app with screen sharing and remote control (C, C++, WinDDK)\n\nThese projects showcase his deep systems programming expertise across platforms.";
  }

  return "Great question! I can tell you about Simpy's 21+ years of experience, his projects (SNMP collectors, ONVIF firmware, 3D LiDAR platforms, medical document libraries), his technical skills in C/C++/Qt/Python, or how to get in touch. What interests you most?";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body: ChatRequestBody = await req.json();
    const message = (body.message ?? "").toString();
    const sessionId = (body.sessionId ?? "").toString();

    const reply = generateReply(message);

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (supabaseUrl && serviceKey && sessionId) {
      try {
        const supabase = createClient(supabaseUrl, serviceKey);
        await supabase.from("chat_messages").insert({
          session_id: sessionId,
          role: "assistant",
          content: reply,
        });
      } catch {
        // best-effort persistence; reply still returned to user
      }
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to process message", reply: "I'm having trouble right now. Please try again or reach out via the contact page." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
