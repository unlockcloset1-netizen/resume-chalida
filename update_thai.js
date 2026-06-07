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
  "- พัฒนาระบบ Help Desk Ticketing, IT Project Dashboard (สำหรับติดตามงาน/งบประมาณ), Print Cost Dashboard และระบบแจ้งเตือนต่ออายุ Software License ผ่าน LINE/Email",
  "7. ผลงานเด่น",
  "- พัฒนา Dashboard วิเคราะห์ต้นทุนการใช้งานเครื่องถ่ายเอกสารรายโครงการ (17 โครงการ) เพื่อติดตามและบริหารจัดการงบประมาณให้เกิดประสิทธิภาพสูงสุด",
  "- พัฒนา Web-based Application (HTML + API + SQL) สำหรับติดตามงบประมาณ IT และสรุปค่าใช้จ่ายแยกรายโครงการ เพื่อวิเคราะห์ Cost การใช้งานจริงและสนับสนุนการตัดสินใจเชิงกลยุทธ์",
  "- พัฒนาระบบ Help Desk (Vercel + Google Apps Script): เพิ่มประสิทธิภาพการจัดการงานแจ้งซ่อมและติดตามสถานะงานภายในองค์กรแบบ Real-time",
  "- เปลี่ยนจาก AutoCAD เป็น ZwCAD (70 License): ลด Cost ได้ ~770,000 บาท/ปี",
  "- ย้าย Virtualization จาก VMware เป็น Nutanix: ลด Cost ด้าน Server ได้ ~132,000 บาท/ปี",
  "- ย้าย Cloud Server ระบบ HR: ลด Cost ได้ ~124,000 บาท/ปี พร้อมประสิทธิภาพที่สูงขึ้น",
  "- บริหารจัดการ License Microsoft 365 (160 user): ปรับโครงสร้างต้นทุนให้เหมาะสม ลด Cost ได้ ~100,000 บาท/ปี",
  "- เปลี่ยนโซลูชัน Antivirus (150 License): ลด Cost ได้ ~45,000 บาท/ปี",
  "- วาง Infrastructure สำนักงานใหญ่ใหม่ทั้งหมด: รองรับพนักงาน 160 คน พร้อมระบบ Network และ Security (Fortigate 100F)",
  "- นำทีมดำเนินการย้ายระบบ ERP Mango (Sybase to SQL Web): จบโครงการภายใน 2 เดือน ช่วยเพิ่มประสิทธิภาพและความเสถียรของระบบให้รองรับการใช้งานได้ดียิ่งขึ้น"
];
data.experience[0].translations.th.highlight = "";

// Exp 2
data.experience[1].translations.th.bullets = [
  "ดูแลงานโครงการให้ลูกค้าแบบครบวงจร ตั้งแต่ออกพบลูกค้าเพื่อเก็บความต้องการ (Requirement) ออกแบบและวางแผนระบบ ลงหน้างานติดตั้งจริง จนถึง Support ดูแลลูกค้าหลังการติดตั้ง",
  "1. ระบบ Virtualization (VMware, Hyper-V, Proxmox)",
  "ออกแบบ ติดตั้ง และบริหารจัดการระบบ Virtualization หลายแพลตฟอร์ม ทั้ง VMware ESXi + vCenter Server, Microsoft Hyper-V และ Proxmox VE พร้อมดูแล VM Guest, vSwitch (Virtual Network) และ VMware vSAN สำหรับ Storage ทั้งภายในองค์กรและติดตั้งให้แก่ลูกค้า",
  "2. ระบบ Server & High Availability",
  "ติดตั้งและบริหารจัดการ Windows Server พร้อม Active Directory 2 Server แบบ Replication รองรับ High Availability จัดโครงสร้าง OU, GPO, DNS, DHCP และ File Share Permission ตั้งค่า Shadow Copy สำหรับ Backup และ Restore ไฟล์ พร้อมวางแผน Preventive Maintenance ประจำปี",
  "3. ระบบ Backup",
  "ออกแบบและบริหารจัดการระบบสำรองข้อมูลด้วย Veeam Backup + NAS Synology",
  "4. ระบบความปลอดภัย (Security & Endpoint)",
  "ติดตั้งและ Config Firewall หลายแพลตฟอร์ม (Fortigate, Zyxel, Sophos) ครอบคลุม Firewall Policy, SSL VPN, IPSec VPN, NAT, IPS และ Web Filtering พร้อม Monitor Traffic, Threat และตรวจสอบ Security Log และ Traffic Log อย่างสม่ำเสมอ",
  "5. ระบบเครือข่าย (Network)",
  "ออกแบบและติดตั้งระบบเครือข่าย ครอบคลุม VLAN, Inter-VLAN Routing, SSID แยกตามประเภทผู้ใช้, QoS และ Port Trunk/Access พร้อม Monitor Network ผ่าน Omada Controller ติดตาม Bandwidth, Client และ Uptime แบบ Real-time พร้อมดูแล Switches, Biometric, CCTV และอุปกรณ์ปลายทาง ทั้งภายในองค์กรและให้แก่ลูกค้า"
];
data.experience[1].translations.th.highlight = "ออกแบบและติดตั้งระบบ Network ให้ลูกค้าองค์กรกว่า 10 โปรเจกต์ ตั้งแต่ขนาดกลางถึงขนาดใหญ่ ติดตั้งและ Config อุปกรณ์ Network (Switch, Router, Firewall) พร้อม Server ให้ทำงานได้อย่างเสถียร ตั้งค่า VPN Site-to-Site เชื่อมต่อระหว่างสาขาเพื่อให้พนักงานทำงานข้ามสาขาได้อย่างปลอดภัย รวมถึงสนับสนุนทีมขายจัดทำ Solution Diagram และอธิบายด้านเทคนิคให้ลูกค้า ช่วยปิดการขายได้มากขึ้น";

// Exp 3
data.experience[2].translations.th.bullets = [
  "1. ระบบ Virtualization (VMware)",
  "บริหารจัดการ VMware ESXi และ vCenter Server ดูแล VM Guest, vSwitch (Virtual Network) และ VMware vSAN สำหรับ Storage",
  "2. ระบบ Server & High Availability",
  "ดูแล Windows Server และ Active Directory แบบ Redundancy จัดโครงสร้าง OU และกำหนดสิทธิ์ผ่าน GPO ตั้งค่า Shadow Copy สำหรับ Backup และ Restore ไฟล์ พร้อมวางแผน Preventive Maintenance ประจำปี",
  "3. ระบบ Backup",
  "บริหารจัดการระบบสำรองข้อมูลด้วย Veeam Backup + NAS Synology",
  "4. ระบบ HIS-LIS (SQL Symphony)",
  "ดูแลระบบ HIS-LIS ให้ทำงานต่อเนื่อง 24 ชั่วโมง พร้อมร่วมทีมย้ายฐานข้อมูล HIS จาก On-Premise ขึ้นสู่ Cloud Infrastructure",
  "5. ระบบความปลอดภัย",
  "จัดการ Endpoint Security ผ่าน ESET NOD32 (On-Premise) และบริหารจัดการ Google G-Suite ในฐานะ Admin: สร้าง/ลบ/โอนย้ายบัญชีผู้ใช้, กำหนดสิทธิ์การเข้าถึง, จัดการ Group, License และ Shared Drive",
  "6. ระบบเครือข่ายและอุปกรณ์ไอที",
  "ติดตั้งและดูแล Switches, Biometric, CCTV และอุปกรณ์ปลายทาง พร้อมบริหารสิทธิ์ผ่าน GPO และบัญชีผู้ใช้ผ่าน Active Directory",
  "7. Business Applications Support",
  "ดูแลและแก้ไขปัญหาการใช้งานโปรแกรมบัญชี Express On Cloud ให้ใช้งานได้ต่อเนื่อง",
  "8. IT Asset Management",
  "จัดทำและดูแลทะเบียนทรัพย์สินไอที ตรวจสอบสถานะการทำงานของอุปกรณ์ พร้อมบริหารจัดการ License Software ขององค์กรอย่างสม่ำเสมอ"
];
data.experience[2].translations.th.highlight = "โปรเจกต์ออกแบบและติดตั้งระบบ Server (Active Directory) ในฐานะ PM\nรับผิดชอบในฐานะ Project Manager ออกแบบและติดตั้งระบบ Active Directory จำนวน 2 เครื่องแบบ Redundancy รองรับ High Availability พร้อม Server เครื่องที่ 3 ทำหน้าที่ Backup ออกแบบโครงสร้าง OU, Group Policy (GPO) และ File Share Permission ติดตั้งระบบ Virtualization ด้วย VMware ESXi + vCenter Server, ระบบฐานข้อมูล SQL Server และระบบสำรองข้อมูลด้วย Veeam Backup + NAS Synology บริหารจัดการการจัดหา Server, Software และ Storage รวมถึงเปรียบเทียบราคาจากผู้จำหน่ายเพื่อให้คุ้มค่างบประมาณ ดำเนินโครงการเสร็จภายใน 30 วันตามแผนงานที่วางไว้";

// Exp 4
data.experience[3].translations.th.bullets = [
  "IT Support & Helpdesk",
  "ดูแล Helpdesk และ Desktop Support ให้ผู้ใช้งานในองค์กร แก้ปัญหาฮาร์ดแวร์ ซอฟต์แวร์ และเครือข่ายเบื้องต้น จัดการบัญชีผู้ใช้ สิทธิ์การเข้าถึง และ Shared Folder รวมถึงดูแลเครื่องพิมพ์และเครื่องถ่ายเอกสารส่วนกลางให้ใช้งานได้ต่อเนื่อง",
  "IT Governance & ISO Standards",
  "จัดทำ IT Policy & Procedure ให้สอดคล้องกับ ISO 9001:2015 และตรวจสอบการทำงานของแผนกไอทีให้เป็นไปตามข้อกำหนด รองรับการ Audit",
  "Server & Infrastructure Management",
  "ดูแล Windows Server และ Active Directory แบบ Redundancy รองรับ High Availability จัดโครงสร้าง OU และกำหนดสิทธิ์ผ่าน GPO ตั้งค่า Shadow Copy สำหรับ Backup และ Restore ไฟล์ พร้อมวางแผน Preventive Maintenance ประจำปี",
  "Business Applications Support",
  "ดูแลและแก้ปัญหาการใช้งานระบบ ERP (Oracle), MES (Manufacturing Execution System) และ WMS (Warehouse Management System) รวมถึงระบบบริหารเงินเดือน (Payday) ของฝ่าย HR",
  "Endpoint & Security Systems",
  "ดูแลระบบกล้องวงจรปิด (CCTV) ทั่วทั้งองค์กร และระบบสแกนลายนิ้วมือ (Time Attendance) สำหรับบันทึกเวลาเข้า-ออกงานของพนักงาน"
];
data.experience[3].translations.th.highlight = "ผลงานเด่น: \nออกแบบและติดตั้งกล้อง CCTV จำนวน 152 ตัว พร้อมเดินสายสัญญาณ Fiber Optic ทั้งหมด เพื่อให้สามารถดูภาพและควบคุมกล้องทุกตัวได้จากจุดเดียว ครอบคลุมทั่วพื้นที่โรงงาน";

// Save
fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Update Complete');
