const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/resume-data.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// ---------------------------------------------------------
// EXP 1: S.MEC Engineering
// ---------------------------------------------------------
data.experience[0].translations.en.bullets = [
  "1. IT Planning & Management",
  "- Plan annual IT budget (Capex & Opex) and manage the IT Support team to serve over 160 employees.",
  "- Evaluate specifications and compare vendor prices to achieve maximum value and quality.",
  "- Maintain systems and develop IT Policies / Procedures in compliance with the ISO 9001:2015 standard.",
  "- Define SLAs and KPIs, track progress, evaluate performance, and continuously develop the IT team's capabilities.",
  "- Conduct employee training on system usage and cybersecurity, and prepare operational summary reports for management.",
  "2. Network & Infrastructure",
  "- Designed and deployed the head office network from the ground up using TP-Link Omada (Router, OC200, Switch, AP), including VLAN segmentation.",
  "- Implemented a Dual ISP setup (AIS + TOT) with Load Balancing and WAN Failover to ensure 99% system uptime.",
  "- Manage Omada: Inter-VLAN Routing, user-group-based SSIDs, QoS, Port Trunk/Access, and real-time monitoring of bandwidth, clients, and uptime.",
  "- Administer two Active Directory servers in a replication (HA) configuration, including management of OUs, GPOs, DNS, DHCP, and File Share permissions.",
  "3. Security & Endpoint",
  "- Configure and manage the FortiGate 100F: firewall policies, SSL/IPSec VPN, NAT, IPS, and web filtering.",
  "- Regularly monitor traffic, threats, and logs to prevent security breaches.",
  "- Maintain 163 endpoint devices (158 notebooks, 5 PCs), as well as CCTV cameras and cloud-connected fingerprint scanners at project sites.",
  "- Manage data backups via NAS on a daily/weekly basis, and develop a Disaster Recovery plan.",
  "4. Server, Cloud & Virtualization",
  "- Manage and maintain virtualization platforms including VMware, Hyper-V, Proxmox, and Nutanix.",
  "- Maintain cloud servers: Humano HR (Inet Cloud).",
  "- Administer Microsoft 365: user management, Exchange, Teams, and MFA.",
  "- Oversee enterprise software licenses: M365, AutoCAD, Revit, BIM, and SketchUp.",
  "5. Database & ERP",
  "- Manage Mango ERP (UIH Cloud): user management, module permissions, workflow configuration (PR/PO/WO), and employee training.",
  "- Maintain SQL Server: user management, backup/restore, basic indexing, error log review, and basic query operations (SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, SUM).",
  "6. Internal Web Application Development",
  "- Develop and maintain internal systems using Google Apps Script + Google Sheets.",
  "- Developed a Help Desk Ticketing system, IT Project Dashboard (for tracking tasks/budgets), Print Cost Dashboard, and a software license renewal notification system via LINE/Email.",
  "7. Key Results",
  "- Developed a dashboard to analyze copier/printer usage costs by project (17 projects) to track and manage budgets for maximum efficiency.",
  "- Developed a web-based application (HTML + API + SQL) for tracking the IT budget and summarizing expenses by project, enabling analysis of actual usage costs and supporting strategic decision-making.",
  "- Developed a Help Desk system (Vercel + Google Apps Script): improving the efficiency of repair-request management and enabling real-time status tracking across the organization.",
  "- Migrated from AutoCAD to ZwCAD (70 licenses): reducing costs by ~770,000 THB/year.",
  "- Migrated virtualization from VMware to Nutanix: reducing server costs by ~132,000 THB/year.",
  "- Migrated the HR cloud server: reducing costs by ~124,000 THB/year while improving performance.",
  "- Managed Microsoft 365 licenses (160 users): optimized the cost structure, reducing costs by ~100,000 THB/year.",
  "- Switched antivirus solutions (150 licenses): reducing costs by ~45,000 THB/year.",
  "- Rebuilt the entire head office infrastructure: supporting 160 employees with full network and security systems (FortiGate 100F).",
  "- Led the team in migrating the Mango ERP system (Sybase to SQL Web): completing the project within 2 months, improving system performance and stability to better support operations."
];

data.experience[0].translations.en.highlight = "";

data.experience[0].translations.zh.bullets = [
  "1. IT 规划与管理 (IT Planning & Management)",
  "- 规划年度 IT 预算（资本支出与运营支出），并管理 IT 支持团队以服务超过 160 名员工。",
  "- 评估设备规格并对比供应商价格，以实现性价比和质量的最大化。",
  "- 维护系统并制定符合 ISO 9001:2015 标准的 IT 政策和流程。",
  "- 制定 SLA（服务等级协议）和 KPI（关键绩效指标），跟踪进度，评估绩效，并持续提升 IT 团队的业务能力。",
  "- 组织员工进行系统使用和网络安全培训，并为管理层编制运营总结报告。",
  "2. 网络与基础设施 (Network & Infrastructure)",
  "- 使用 TP-Link Omada（路由器、OC200 控制器、交换机、接入点）从零开始设计并部署总部网络，包括划分 VLAN（虚拟局域网）。",
  "- 实施双 ISP（AIS + TOT）接入，配置负载均衡和广域网（WAN）故障转移，以确保 99% 的系统正常运行时间。",
  "- 管理 Omada 网络：配置 VLAN 间路由、基于用户组的 SSID、服务质量（QoS）、端口 Trunk/Access 模式，并实时监控带宽、客户端及运行时间。",
  "- 管理采用高可用复制配置的两台 Active Directory（活动目录）服务器，包括 OU（组织单位）、GPO（组策略）、DNS、DHCP 及文件共享权限的管理。",
  "3. 安全与终端管理 (Security & Endpoint)",
  "- 配置和管理 FortiGate 100F：包括防火墙策略、SSL/IPSec VPN、NAT、入侵防御系统（IPS）和网页过滤。",
  "- 定期监控网络流量、威胁和日志，以防止安全漏洞。",
  "- 维护 163 台终端设备（158 台笔记本电脑，5 台台式机），以及项目现场的监控摄像头和云端连接的指纹打卡机。",
  "- 通过 NAS 执行每日/每周数据备份，并制定灾难恢复（DR）计划。",
  "4. 服务器、云与虚拟化 (Server, Cloud & Virtualization)",
  "- 管理并维护包括 VMware、Hyper-V、Proxmox 和 Nutanix 在内的虚拟化平台。",
  "- 维护云服务器：Humano HR（Inet Cloud）。",
  "- 管理 Microsoft 365：包括用户管理、Exchange、Teams 以及多因素身份验证（MFA）。",
  "- 监管企业软件许可证：包括 M365、AutoCAD、Revit、BIM 和 SketchUp。",
  "5. 数据库与 ERP (Database & ERP)",
  "- 管理 Mango ERP（UIH 云）：包括用户管理、模块权限、工作流配置（PR/PO/WO）以及员工培训。",
  "- 维护 SQL Server：包括用户管理、备份与恢复、基础索引、错误日志审查以及基础查询操作（SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, SUM）。",
  "6. 内部 Web 应用开发 (Internal Web Application Development)",
  "- 使用 Google Apps Script + Google Sheets 开发并维护内部系统。",
  "- 开发了 IT 报修工单系统、IT 项目仪表板（用于跟踪任务/预算）、打印成本仪表板，以及通过 LINE/邮件发送的软件许可证到期提醒系统。",
  "7. 关键成果 (Key Results)",
  "- 开发了复印机/打印机按项目（17 个项目）使用成本分析的仪表板，以跟踪和管理预算，实现效率最大化。",
  "- 开发了用于跟踪 IT 预算和按项目汇总支出的 Web 应用程序（HTML + API + SQL），实现了实际使用成本分析并支持战略决策。",
  "- 开发了 IT 报修（Help Desk）系统（Vercel + Google Apps Script）：提高了报修请求管理的效率，并在整个组织内实现了实时状态跟踪。",
  "- 将 AutoCAD 切换为 ZwCAD（70 个许可证）：每年降低成本约 770,000 泰铢。",
  "- 将虚拟化平台从 VMware 迁移至 Nutanix：每年降低服务器成本约 132,000 泰铢。",
  "- 迁移人力资源（HR）云服务器：在提升性能的同时，每年降低成本约 124,000 泰铢。",
  "- 管理 Microsoft 365 许可证（160 名用户）：优化了成本结构，每年降低成本约 100,000 泰铢。",
  "- 更换杀毒软件解决方案（150 个许可证）：每年降低成本约 45,000 泰铢。",
  "- 重建总部整体基础设施：为 160 名员工提供完整的网络与安全系统支持（FortiGate 100F）。",
  "- 带领团队执行 Mango ERP 系统迁移项目（Sybase 升级为 SQL Web）：在 2 个月内顺利完成，提升了系统性能与稳定性，从而更好地支持业务运营。"
];

data.experience[0].translations.zh.highlight = "";

// ---------------------------------------------------------
// EXP 2: TK-Connecting
// ---------------------------------------------------------
data.experience[1].translations.en.bullets = [
  "1. IT Solution Design & Planning",
  "- Analyzed client requirements to design customized systems (Network, Server, Security, Cloud)",
  "- Developed technical Solution Diagrams and prepared detailed proposals/quotations",
  "2. Pre-Sales Technical Support",
  "- Collaborated with the sales team to present technical solutions to prospective clients",
  "- Provided expert consultation to support client decision-making",
  "3. System Implementation",
  "- Installed and configured Hardware/Software (Servers, Firewalls, Switches, Routers, NAS)",
  "- Conducted rigorous system testing prior to final handover",
  "4. After-Sales Support & Maintenance",
  "- Provided remote and on-site troubleshooting during warranty periods",
  "- Conducted scheduled Preventive Maintenance (PM) for Servers, UPS, and Network equipment",
  "- Generated comprehensive Network Health Check Reports for clients",
  "5. Documentation & Training",
  "- Developed user manuals and conducted system training for clients",
  "- Managed Project Documentation and User Acceptance Testing (UAT)"
];
data.experience[1].translations.en.highlight = "Key Accomplishments:\n• Designed and implemented Network Infrastructure for 10+ enterprise projects (largest project valued at 800k THB).\n• Ensured stable operation of high-availability Network and Server environments.\n• Deployed Site-to-Site VPN solutions to enable secure inter-branch connectivity.\n• Improved deal closure rates by providing high-quality technical diagrams and pre-sales consultation.";

data.experience[1].translations.zh.bullets = [
  "1. IT 解决方案设计与规划",
  "- 分析客户需求，量身定制系统架构（网络、服务器、安全、云端）",
  "- 绘制技术方案图并准备详细的报价单和提案",
  "2. 售前技术支持",
  "- 配合销售团队向客户演示技术方案并进行详细讲解",
  "- 提供专业咨询，协助客户进行采购决策",
  "3. 系统实施与安装",
  "- 安装并配置各类软硬件（服务器、防火墙、交换机、路由器、NAS）",
  "- 在正式交付前进行严谨的系统测试，确保功能完备",
  "4. 售后支持与维护",
  "- 在保修期内提供远程和现场技术排障",
  "- 定期执行预防性维护（PM），涵盖服务器、UPS 和网络设备",
  "- 为客户编制网络健康检查报告（Network Health Check Report）",
  "5. 文档与培训",
  "- 编写用户手册并对客户进行系统操作培训",
  "- 负责项目验收文档（UAT）及交付手续"
];
data.experience[1].translations.zh.highlight = "主要成就：\n• 为 10 多个企业客户设计并实施了网络基础设施项目（最大项目金额达 80 万泰铢）。\n• 确保了高可用网络和服务器环境的稳定运行。\n• 部署了站点到站点 VPN 方案，实现了安全的跨分支机构互联。\n• 通过提供高质量的技术方案图和售前咨询，显著提升了项目中标率。";

// ---------------------------------------------------------
// EXP 3: Professional Laboratories
// ---------------------------------------------------------
data.experience[2].translations.en.bullets = [
  "1. Server & Identity Management",
  "- Managed users and security policies via Active Directory and GPO",
  "- Administered file sharing permissions and folder security",
  "2. Cloud Systems & Security",
  "- Oversaw the HIS-LIS SQL SYMPHONY platform",
  "- Managed cloud-based Endpoint Security (ESET Nod32)",
  "- Administered Google Workspace (Email and account management)",
  "3. IT Infrastructure Implementation",
  "- Designed and installed AD Servers, Switches, Finger Scan, CCTV, and NAS backup systems",
  "4. Technical Support & SLA Management",
  "- Managed and tracked service requests via an online ticketing system",
  "- Defined SLAs and analyzed support data to continuously improve resolution times",
  "5. Budget & Vendor Management",
  "- Prepared annual budgets for equipment, maintenance, and software licenses",
  "- Coordinated with vendors to compare quotes and select optimal service providers"
];
data.experience[2].translations.en.highlight = "Key Project: Successfully led the Hospital Information System (HIS) server migration from On-Premise to Cloud.\n• Managed the seamless data transfer of the entire HIS system to Cloud Infrastructure.\n• Performed comprehensive Backup & Restore testing to ensure zero data loss.\n• Optimized the cloud environment for stability and healthcare-grade data security compliance.\n• Reduced server maintenance overhead and enabled future scalability. Project was delivered on-time and passed all UAT.";

data.experience[2].translations.zh.bullets = [
  "1. 服务器与身份管理",
  "- 通过 Active Directory 和组策略（GPO）管理用户及安全策略",
  "- 管理文件共享权限及文件夹安全性",
  "2. 云系统与安全管理",
  "- 监管 HIS-LIS SQL SYMPHONY 平台",
  "- 管理基于云的端点安全系统（ESET Nod32）",
  "- 管理 Google Workspace（企业邮箱及账号管理）",
  "3. IT 基础设施实施",
  "- 设计并安装 AD 服务器、交换机、指纹考勤、CCTV 和 NAS 备份系统",
  "4. 技术支持与 SLA 管理",
  "- 通过在线工单系统管理并跟踪报修请求",
  "- 设定 SLA 标准并分析支持数据，不断优化故障解决速度",
  "5. 预算与供应商管理",
  "- 编制设备采购、系统维护及软件许可证的年度预算",
  "- 与供应商协调，通过价格比对选择最优服务商"
];
data.experience[2].translations.zh.highlight = "关键项目：成功主导了医院信息系统 (HIS) 服务器从本地到云端的迁移。\n• 确保了整个 HIS 系统向云端基础设施的无缝数据迁移。\n• 执行了全面的备份与恢复测试，确保数据零丢失。\n• 优化了云环境的稳定性，并确保符合医疗级数据安全标准。\n• 降低了服务器维护成本并提升了未来扩展性。项目按时交付并顺利通过 UAT 验收。";

// ---------------------------------------------------------
// EXP 4: Nanmee Industry
// ---------------------------------------------------------
data.experience[3].translations.en.bullets = [
  "1. Server & AD Maintenance",
  "- Monitored server health and managed corporate Active Directory",
  "- Handled user account lifecycle, GPO management, and data access rights",
  "2. Technical Troubleshooting",
  "- Provided expert repair and troubleshooting for hardware, software, network, and ERP (Oracle) issues",
  "3. Infrastructure Maintenance",
  "- Maintained PCs, Notebooks, and network peripherals to ensure operational readiness",
  "4. Data Backup & Recovery",
  "- Executed server and client backups according to corporate policy",
  "- Regularly tested backup integrity to guarantee recovery during emergencies",
  "5. User Support (Helpdesk)",
  "- Provided technical consultation and resolved IT issues for staff to maximize productivity"
];
data.experience[3].translations.en.highlight = "Major Achievement: Designed and installed a massive 152-camera CCTV system with a complete Fiber Optic backbone, enabling centralized monitoring and control across the entire facility.";

data.experience[3].translations.zh.bullets = [
  "1. 服务器与 AD 维护",
  "- 监控服务器健康状态并管理公司 Active Directory",
  "- 处理用户账号生命周期、组策略管理及数据访问权限",
  "2. Technical Troubleshooting",
  "- 针对硬件、软件、网络及 ERP (Oracle) 问题提供专业的维修和排障服务",
  "3. 基础设施维护",
  "- 维护电脑、笔记本及网络外设，确保其始终处于良好运行状态",
  "4. 数据备份与恢复",
  "- 根据公司政策执行服务器 and 客户端数据备份",
  "- 定期测试备份完整性，确保在紧急情况下可 100% 恢复",
  "5. 用户支持 (Helpdesk)",
  "- 为员工提供技术咨询并解决 IT 问题，以最大化办公效率"
];
data.experience[3].translations.zh.highlight = "主要成就：设计并安装了拥有 152 个摄像头的超大型 CCTV 监控系统，并配套了完整的光纤主干网，实现了全厂区的集中监控与管理。";

// Save
fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('EN & ZH Update Complete');
