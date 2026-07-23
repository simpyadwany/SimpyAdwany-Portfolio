/*
# Update blog posts to match Simpy's domain expertise

## Summary
Replaces the generic blog posts with articles relevant to Simpy's actual
experience in network management, video surveillance, and embedded systems.

## Changes
- Inserts 3 new blog posts with topics aligned to the resume:
  1. Building SNMP-based Network Monitoring with MQTT Telemetry
  2. Lessons from Developing ONVIF-Compliant Camera Firmware
  3. 21 Years of Systems Programming: C++ in Medical, Surveillance, and Automotive
- All posts are published=true
- Uses ON CONFLICT (slug) DO UPDATE to be idempotent
*/

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, tags, published, published_at) VALUES
(
  'Building SNMP-Based Network Monitoring with MQTT Telemetry',
  'snmp-mqtt-network-monitoring',
  'How I designed a monitoring solution for Nokia SAR-HM devices that collects SNMP data, processes KPIs, and publishes telemetry to an MQTT broker for storage in InfluxDB.',
  '## Building SNMP-Based Network Monitoring with MQTT Telemetry

Network management systems live and die by their ability to collect, process, and act on data from distributed devices. On the SAR-HM SNMP collector project, I designed a monitoring solution for Nokia SAR-HM devices that does exactly that — collects SNMP data, processes KPIs, and publishes telemetry to an MQTT broker for storage in InfluxDB.

### The Architecture

The system follows a pipeline approach:

- **SNMP polling** modules query Nokia SAR-HM devices at defined intervals
- **KPI processing** normalizes raw SNMP responses into meaningful metrics
- **MQTT publishing** sends processed telemetry to a broker
- **InfluxDB storage** persists time-series data for dashboards and alerting

### Why MQTT?

MQTT''s lightweight publish/subscribe model is ideal for telemetry pipelines. It decouples the collector from the storage layer, allows multiple consumers to subscribe to the same data stream, and handles intermittent connectivity gracefully — all critical in telecom network environments.

### Lessons Learned

Defining the KPI mapping and MQTT payload structure up front saved weeks of rework. Working directly with customers to gather requirements ensured we collected the metrics that actually mattered, not just the ones that were easy to poll. And as Technical Lead for a team of four, code reviews and mentoring were as important to the project''s success as the architecture itself.',
  'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['SNMP', 'MQTT', 'Network Management', 'Python', 'Telemetry'],
  true,
  now() - interval '3 days'
),
(
  'Lessons from Developing ONVIF-Compliant Camera Firmware',
  'onvif-camera-firmware',
  'Building ONVIF-compliant firmware for network video surveillance cameras taught hard lessons about interoperability, protocol conformance, and the realities of the surveillance ecosystem.',
  '## Lessons from Developing ONVIF-Compliant Camera Firmware

Developing ONVIF-compliant firmware for network video surveillance cameras was one of the most technically demanding projects of my career. The goal was simple to state — ensure interoperability with third-party ONVIF clients and devices — and hard to achieve.

### The ONVIF Challenge

ONVIF is a standard, but implementations vary. Building firmware that works reliably across the ecosystem of ONVIF clients means dealing with:

- **SOAP/WSDL service layers** generated via gSOAP
- **Protocol conformance** across Profile S, G, and T
- **Interoperability edge cases** that only surface with specific third-party clients

### Tools That Made the Difference

Wireshark was indispensable for inspecting SOAP exchanges on the wire. Valgrind caught memory leaks that would have been fatal in long-running embedded firmware. SoapUI helped validate SOAP request/response patterns against the WSDL. And a robust automation framework — built in Python — let us run regression tests across conformance scenarios.

### The Bigger Picture

ONVIF compliance is not a one-time achievement. It requires continuous testing against evolving client implementations, disciplined release management, and a team that understands both the protocol layer and the embedded constraints underneath. The code coverage and memory leak reports we generated on every build were the safety net that made reliable delivery possible.',
  'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['ONVIF', 'Video Surveillance', 'Firmware', 'C', 'gSOAP'],
  true,
  now() - interval '10 days'
),
(
  '21 Years of Systems Programming: C++ Across Domains',
  'cpp-across-domains',
  'From medical document libraries to 3D LiDAR sensor management to autonomous vehicle visualization — two decades of C++ taught me what changes and what stays the same.',
  '## 21 Years of Systems Programming: C++ Across Domains

Over 21 years, I have written C++ for medical document generation, XSL-FO processing, interactive whiteboards, virtual printer drivers, 3D LiDAR sensor management, and autonomous vehicle visualization. The domains changed. The discipline did not.

### What Stays the Same

Regardless of domain, the fundamentals of good systems programming hold:

- **Memory discipline** — Valgrind, WinDbg, and careful ownership semantics are non-negotiable
- **Build systems** — CMake and Jenkins pipelines that produce reproducible builds
- **Cross-platform awareness** — Linux and Windows have different assumptions, and code that ignores them breaks
- **Performance consciousness** — point cloud processing and real-time visualization demand it

### What Changes

Each domain brings its own abstractions. Medical software lives in the world of HL7 CDA and XML. Video surveillance lives in ONVIF and SOAP. LiDAR lives in point clouds and 3D rendering. The domain knowledge is the hard part — the C++ is the medium.

### The Qt Factor

Qt and QML have been a through-line across many of these projects — from whiteboard applications in 2008 to Qortex and QGuard today. The framework''s cross-platform capabilities and signal/slot architecture have made it the right tool for desktop and embedded UI work across very different product categories.

### Advice to Engineers

Learn the fundamentals deeply. Tools and frameworks come and go, but the ability to reason about memory, concurrency, performance, and system boundaries transfers to every domain you will ever work in.',
  'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['C++', 'Qt', 'Systems Programming', 'LiDAR', 'Cross-Platform'],
  true,
  now() - interval '18 days'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image = EXCLUDED.cover_image,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at;
