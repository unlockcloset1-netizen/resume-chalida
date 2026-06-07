const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/resume-data.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Exp 1
data.experience[0].translations.th.bullets = [
  "1. IT Planning & Management",
  "- วางแผนงบประมาณ IT ประจำปี (Capex & Opex) และบริหารทีม IT Support เพื่อดูแลพนักงานกว่า 160 คน",
  "- ประเมินสเปกและเปรียบเทียบราคาอุปกรณ์จากคู่ค้า (Vendor) เพื่อให้ได้ความคุ้มค่าและคุณภาพสูงสุด",
  "- ดูแลระบบและจัดทำ IT Policy / Procedure ให้สอดคล้องกับมาตรฐาน ISO 9001:2015",
  "- กำหนด SLA, KPI ติดตามความคืบหน้า ประเมินผล และพัฒนาศักยภาพทีม IT อย่างต่อเนื่อง",
  "- จัดอบรมพนักงานด้านการใช้งานระบบและความปลอดภัยทางไซเบอร์ พร้อมสรุปผลการดำเนินงานรายงานผู้บริหาร",
  "2. Network & Infrastructure",
  "- ออกแบบและติดตั้งระบบเครือข่ายสำนักงานใหญ่ตั้งแต่ศูนย์ด้วย TP-Link Omada (Router, OC200, Switch, AP) พร้อมกำหนด VLAN Segmentation",
  "- วางระบบ Dual ISP (AIS + TOT) แบบ Load Balancing และ WAN Failover เพื่อให้ระบบทำงานต่อเนื่อง 99%",
  "- บริหารจัดการ Omada: Inter-VLAN Routing, SSID แยกตามกลุ่มผู้ใช้, QoS, Port Trunk/Access และมอนิเตอร์ Bandwidth, Client, Uptime แบบ Real-time",
  "- บริหาร Active Directory 2 Server แบบ Replication (HA) รวมถึงการจัดการ OU, GPO, DNS, DHCP และ File Share Permission",
  "3. Security & Endpoint",
  "- คอนฟิกและบริหารจัดการ Fortigate 100F: Firewall Policy, SSL/IPSec VPN, NAT, IPS และ Web Filtering",
  "- ตรวจสอบ Traffic, Threat และ Log อย่างสม่ำเสมอเพื่อป้องกันภัยคุกคาม",
  "- ดูแลอุปกรณ์ปลายทาง 163 เครื่อง (Notebook 158, PC 5) รวมถึงกล้อง CCTV และระบบสแกนลายนิ้วมือที่เชื่อมต่อ Cloud ประจำไซด์งาน",
  "- จัดการระบบสำรองข้อมูล (Backup) ผ่าน NAS รายวัน/รายสัปดาห์ พร้อมจัดทำแผน Disaster Recovery",
  "4. Server, Cloud & Virtualization",
  "- บริหารจัดการและดูแลระบบ Virtualization ทั้ง VMware, Hyper-V, Proxmox และ Nutanix",
  "- ดูแลระบบ Cloud Server: Humano HR (Inet Cloud)",
  "- บริหารจัดการ Microsoft 365: User Management, Exchange, Teams และ MFA",
  "- ควบคุมดูแล License ซอฟต์แวร์องค์กร: M365, AutoCAD, Revit, BIM และ SketchUp",
  "5. Database & ERP",
  "- บริหารจัดการ Mango ERP (UIH Cloud): จัดการผู้ใช้, กำหนดสิทธิ์ Module, ตั้งค่า Workflow (PR/PO/WO) และฝึกอบรมพนักงาน",
  "- ดูแล SQL Server: User Management, Backup/Restore, Basic Indexing, ตรวจสอบ Error Log และจัดการคำสั่งพื้นฐาน (SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, SUM)",
  "6. Internal Web Application Development",
  "- พัฒนาและดูแลระบบภายในด้วย Google Apps Script + Google Sheets",
  "- พัฒนาระบบ Help Desk Ticketing, IT Project Dashboard (สำหรับติดตามงาน/งบประมาณ), Print Cost Dashboard และระบบแจ้งเตือนต่ออายุ Software License ผ่าน LINE/Email"
];

data.experience[0].translations.th.highlight = "★ สรุปผลงานที่ S.MEC Engineering\n✓ ลดต้นทุน IT รวมกว่า 1.1 ล้านบาท/ปี\n✓ วาง Infrastructure สำนักงานใหญ่ใหม่จากศูนย์ รองรับพนักงาน 160 คน\n✓ พัฒนา Web App ใช้เองในองค์กรถึง 4 ระบบ\n✓ ย้ายระบบ ERP สำเร็จภายใน 1 เดือน\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🔹 ผลงานลดต้นทุน IT (ประหยัดไป 1,126,000 บาท/ปี)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n1. เปลี่ยนมาใช้ ZwCAD แทน AutoCAD (70 License) \n   ➤ ประหยัดไป ~770,000 บาท/ปี\n2. เปลี่ยนระบบ Virtualization จาก VMware เป็น Nutanix\n   ➤ ประหยัดค่า Server ไป ~132,000 บาท/ปี\n3. ย้าย Cloud Server ของระบบ HR (ได้สเปคดีขึ้น)\n   ➤ ประหยัดค่าบริการไป ~124,000 บาท/ปี\n4. ปรับแพ็กเกจ Microsoft 365 ใหม่ให้ตรงกับการใช้งานจริง (160 User)\n   ➤ ประหยัดไป ~100,000 บาท/ปี\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🔹 ผลงานวางระบบและพัฒนาแอป\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n5. วางระบบ IT สำนักงานใหญ่ใหม่ (ทำคนเดียวตั้งแต่ต้นจนจบ)\n   • ตั้ง Server AD คุมสิทธิ์พนักงาน 160 คน\n   • ติดตั้ง Fortigate 100F จัดการ Policy และ VPN\n   • ติดตั้ง Switch และ AP คลุมทั้งตึก\n   • จัดการให้เครื่องสแกนนิ้ว 19 ไซต์งานส่งข้อมูลเข้าส่วนกลางแบบ Real-time\n6. คุมโปรเจกต์ย้ายระบบ ERP Mango (จาก Sybase เป็น SQL Web)\n   ➤ จบโปรเจกต์ใน 1 เดือน ระบบนิ่ง 100% แก้ปัญหาเน็ตเวิร์กหน่วงที่เรื้อรังมานาน\n7. เขียน Web App ใช้งานเอง 3 ระบบ (ใช้ Google Apps Script + Google Sheets)\n   • ระบบแจ้งซ่อม IT (Help Desk)\n   • ระบบติดตามงานและงบประมาณ IT (Dashboard)\n   • ระบบรายงานค่าพิมพ์ (Print Cost)\n8. ติดตั้งระบบโทรศัพท์ IP Phone ภายในเอง ช่วยประหยัดค่าจ้าง Outsource";

// Exp 2
data.experience[1].translations.th.bullets = [
  "1. ออกแบบและวางแผน IT Solution",
  "- คุยกับลูกค้าเพื่อวิเคราะห์ความต้องการและออกแบบระบบ (Network, Server, Security, Cloud)",
  "- ทำ Solution Diagram และเตรียมเอกสารเสนอราคา",
  "2. สนับสนุนทีมขาย (Pre-Sales)",
  "- ไปพรีเซนต์งานกับเซลส์ ช่วยอธิบายเชิงเทคนิคให้ลูกค้าเข้าใจ",
  "- ตอบคำถามและให้คำปรึกษาเพื่อช่วยให้ลูกค้าตัดสินใจง่ายขึ้น",
  "3. ติดตั้งและตั้งค่าระบบ (Implementation)",
  "- ติดตั้งและ Config อุปกรณ์ให้ลูกค้า (Server, Firewall, Switch, Router, NAS)",
  "- เทสต์ระบบให้ชัวร์ก่อนส่งมอบงาน",
  "4. บริการหลังการขาย (After-Sales Support)",
  "- รีโมทและวิ่ง On-site เพื่อแก้ปัญหาให้ลูกค้าในช่วงรับประกัน",
  "5. บำรุงรักษาระบบ (PM)",
  "- เข้าตรวจเช็คอุปกรณ์ตามรอบ (Server, UPS, Network)",
  "- ทำรายงานสภาพระบบ (Network Health Check Report) ส่งให้ลูกค้า",
  "6. การทำเอกสารและอบรม",
  "- ทำคู่มือและสอนลูกค้าใช้งานระบบ",
  "- จัดทำเอกสารส่งมอบงาน (UAT)"
];
data.experience[1].translations.th.highlight = "ผลงานเด่น:\n• ออกแบบและติดตั้งระบบ Network ให้องค์กรลูกค้ากว่า 10 โปรเจกต์ (โปรเจกต์ใหญ่สุดมูลค่า 800,000 บาท)\n• ติดตั้งและ Config อุปกรณ์ Network (Switch, Router, Firewall) และ Server ให้อย่างเสถียร\n• ทำ VPN Site-to-Site เชื่อมต่อสาขาต่างๆ ให้พนักงานทำงานข้ามสาขาได้อย่างปลอดภัย\n• ช่วยทีมขายทำ Solution Diagram อธิบายเทคนิคจนปิดการขายได้เยอะขึ้น";

// Exp 3
data.experience[2].translations.th.bullets = [
  "1. ดูแลจัดการระบบ Server",
  "- จัดการ User ผ่าน Active Directory",
  "- ตั้งค่าความปลอดภัยด้วย Group Policy และกำหนดสิทธิ์การแชร์ไฟล์",
  "2. จัดการระบบ Cloud และความปลอดภัย",
  "- ดูแลระบบ HIS-LIS SQL SYMPHONY",
  "- จัดการแอนตี้ไวรัส (ESET Nod32) บน Cloud",
  "- ดูแลระบบ Google Workspace (อีเมลและบัญชีองค์กร)",
  "3. โครงสร้างพื้นฐาน IT",
  "- ออกแบบและติดตั้ง Server AD, Switch, สแกนนิ้ว, กล้อง CCTV, NAS และระบบ Backup",
  "4. ซัพพอร์ตและซ่อมบำรุง",
  "- จัดคิวและตามงานแจ้งซ่อมผ่านระบบออนไลน์",
  "- ตั้ง SLA และเก็บข้อมูลมาวิเคราะห์เพื่อปรับปรุงการทำงานให้เร็วขึ้น",
  "5. จัดการงบประมาณ",
  "- วางแผนงบซื้ออุปกรณ์, ค่าซ่อมบำรุง และค่า License รายปี",
  "- คุยกับ Vendor เทียบราคาเพื่อหาตัวเลือกที่คุ้มที่สุด"
];
data.experience[2].translations.th.highlight = "โปรเจกต์สำคัญ: รับผิดชอบงานย้ายระบบ Server ของโรงพยาบาล (HIS) จาก On-Premise ขึ้น Cloud\n• วางแผนและคุมงานย้ายข้อมูล HIS ทั้งระบบขึ้น Cloud ได้อย่างราบรื่น\n• เทสต์ Backup & Restore ป้องกันข้อมูลหายระหว่างย้ายระบบ\n• จูนระบบ Cloud ให้ทำงานนิ่ง และเพิ่มความปลอดภัยตามมาตรฐานข้อมูลสุขภาพ\n• ช่วยลดค่าดูแล Server ประหยัดงบ และทำให้ขยายระบบในอนาคตได้ง่าย โปรเจกต์จบตรงเวลาและส่งมอบผ่าน UAT เรียบร้อย";

// Exp 4
data.experience[3].translations.th.bullets = [
  "1. ดูแล Server และ Active Directory",
  "- คอยเช็คการทำงานของ Server และจัดการ AD ของบริษัท",
  "- สร้าง/ลบ User, จัดการ Group Policy และสิทธิ์การเข้าถึงข้อมูล",
  "2. ซ่อมและแก้ปัญหา IT",
  "- ซ่อมคอมพิวเตอร์, แก้ปัญหา Network, อินเทอร์เน็ต, อีเมล และระบบ ERP (Oracle)",
  "3. บำรุงรักษาอุปกรณ์",
  "- ดูแลบำรุงรักษา PC, Notebook และอุปกรณ์เน็ตเวิร์กให้พร้อมใช้เสมอ",
  "4. สำรองข้อมูล (Backup)",
  "- ทำ Backup ข้อมูล Server และเครื่องพนักงานตามนโยบาย",
  "- หมั่นเทสต์ไฟล์ Backup เพื่อให้มั่นใจว่ากู้ข้อมูลได้จริงตอนฉุกเฉิน",
  "5. ซัพพอร์ตพนักงาน (Helpdesk)",
  "- ให้คำปรึกษาและแก้ปัญหาคอมพิวเตอร์ให้พนักงานทำงานได้สะดวกขึ้น"
];
data.experience[3].translations.th.highlight = "ผลงานเด่น: \nออกแบบและติดตั้งกล้อง CCTV จำนวน 152 ตัว พร้อมเดินสายสัญญาณ Fiber Optic ทั้งหมด เพื่อให้สามารถดูภาพและควบคุมกล้องทุกตัวได้จากจุดเดียว ครอบคลุมทั่วพื้นที่โรงงาน";

// Save
fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Update Complete');
