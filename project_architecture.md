# โครงสร้างสถาปัตยกรรมและการเชื่อมต่อระบบ (Project Architecture & Connections)

เอกสารฉบับนี้อธิบายโครงสร้างการทำงานและการเชื่อมต่อของระบบเว็บไซต์เรซูเม่ออนไลน์ **`resume-next`** ว่าแต่ละส่วนทำงานและเชื่อมโยงกันอย่างไร ทั้งในส่วนของระบบพัฒนาในเครื่อง (Local) และระบบออนไลน์จริง (Cloud)

---

## 📊 แผนผังการทำงานของระบบ (System Flowchart)

```mermaid
graph TD
    %% Styling
    classDef local fill:#f9f5ff,stroke:#7f56d9,stroke-width:2px,color:#344054;
    classDef cloud fill:#f0f9ff,stroke:#027a48,stroke-width:2px,color:#344054;
    classDef service fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#344054;
    
    %% Local Elements
    subgraph LocalComputer["💻 เครื่องคอมพิวเตอร์ของคุณ (Local Development)"]
        LocalCode["ซอร์สโค้ด Next.js<br>(c:\Users\ITadmin\resume-next)"]:::local
        EnvFile["ไฟล์ .env.local<br>(เก็บค่า API Keys ท้องถิ่น)"]:::local
        LocalJSON["ไฟล์ข้อมูลสำรอง<br>(resume-data.json)"]:::local
        GitCLI["ระบบ Git (ในเครื่อง)"]:::local
    end

    %% Cloud Elements
    subgraph CloudPlatform["☁️ ระบบคลาวด์และออนไลน์ (Production Site)"]
        GitHub["1. GitHub Repository<br>(ariff2006/resume-next)"]:::cloud
        Vercel["2. Vercel Server<br>(ประมวลผลและแสดงผลเว็บ)"]:::cloud
        VercelEnv["Vercel Env Variables<br>(เก็บคีย์เชื่อมโยงคลาวด์)"]:::cloud
        Supabase["3. Supabase Database<br>(เก็บข้อมูลเรซูเม่หลัก)"]:::service
        SupabaseStorage["4. Supabase Storage<br>(เก็บรูปภาพ/ไฟล์ PDF ใบรับรอง)"]:::service
    end

    %% Flow Connections
    LocalCode -. อ่านค่าเชื่อมต่อ .-> EnvFile
    LocalCode -. อ่านข้อมูลกรณีไม่มีคีย์ฐานข้อมูล .-> LocalJSON
    
    GitCLI -- "git push" --> GitHub
    GitHub -- "Auto Trigger Deploy" --> Vercel
    Vercel -. อ่านค่าเชื่อมต่อ .-> VercelEnv
    
    %% Data Connections
    Vercel -- "ดึงข้อมูลเรซูเม่มาแสดงผล" --> Supabase
    Vercel -- "ดึงไฟล์รูปภาพ/ใบรับรอง" --> SupabaseStorage
    
    %% User Access
    UserBrowser["🌐 ผู้เข้าชมทั่วไป<br>(resume-next-blond.vercel.app)"]:::cloud
    AdminBrowser["🔐 ผู้ดูแลระบบ (หน้า Admin)<br>(/admin)"]:::cloud
    
    Vercel -- "แสดงผลหน้าเว็บ" --> UserBrowser
    Vercel -- "อัปเดตข้อมูล / อัปโหลดไฟล์" --> AdminBrowser
    AdminBrowser -- "บันทึกข้อมูลใหม่" --> Supabase
    AdminBrowser -- "บันทึกไฟล์ภาพ/PDF" --> SupabaseStorage
```

---

## 🛠️ รายละเอียดการทำงานของแต่ละส่วนและการเชื่อมโยง

### 1. เครื่องคอมพิวเตอร์ของคุณ (Local Computer)
* **โฟลเดอร์งาน:** ตั้งอยู่ที่ `c:\Users\ITadmin\resume-next` ซึ่งเก็บซอร์สโค้ดทั้งหมดที่เราพัฒนา
* **ไฟล์ `src/data/resume-data.json` (Local Data):** ทำหน้าที่เป็นข้อมูลสำรอง (Fallback) หากเราเปิดทดสอบระบบบนเครื่องตัวเองโดยไม่ได้ระบุคีย์ต่อกับฐานข้อมูลระบบจะดึงไฟล์นี้มาแสดงผลแทนเพื่อให้ทำงานต่อได้ไม่สะดุด
* **ไฟล์ `.env.local`:** เป็นไฟล์ที่เก็บค่าเชื่อมต่อกับฐานข้อมูลคลาวด์ เช่น `SUPABASE_SERVICE_ROLE_KEY` เมื่อเราใส่คีย์จริงในเครื่อง ระบบส่วนพัฒนาในเครื่องจะเชื่อมต่อตรงกับฐานข้อมูลออนไลน์ทันที

### 2. คลังโค้ด GitHub (GitHub Repository)
* **หน้าที่:** เป็นแหล่งจัดเก็บโค้ดระบบความปลอดภัยสูง (Version Control) 
* **การเชื่อมโยง:** เมื่อมีการสั่ง `git push` จากคอมพิวเตอร์ของคุณ ตัวโค้ดล่าสุดจะส่งขึ้นไปยัง GitHub ทันที จากนั้น GitHub จะส่งสัญญาณไปบอก **Vercel** ให้ทำการอัปเดตหน้าเว็บจริงโดยอัตโนมัติ

### 3. ระบบโฮสติ้ง Vercel (Production Hosting)
* **หน้าที่:** เป็นตัวประมวลผลเซิร์ฟเวอร์เพื่อให้ผู้ใช้ทั่วไปเข้าถึงเว็บไซต์ผ่านลิงก์ `resume-next-blond.vercel.app`
* **การเชื่อมโยง:** ดึงการตั้งค่าคีย์ฐานข้อมูลจาก **Vercel Environment Variables** เพื่อส่งคำขอข้อมูลไปยัง **Supabase** อย่างปลอดภัยโดยไม่ต้องแสดงคีย์นั้นให้ผู้ใช้งานภายนอกเห็น

### 4. ฐานข้อมูลและจัดเก็บไฟล์ Supabase (Database & Storage)
* **Supabase Database (PostgreSQL):** เก็บข้อมูลเนื้อหาในเรซูเม่ทั้งหมด (เช่น ประวัติการทำงาน, การศึกษา, ทักษะ และข้อมูลส่วนตัว) โดยเก็บในตารางชื่อว่า `resumes`
* **Supabase Storage:** เป็นถังเก็บไฟล์สื่อออนไลน์ (Bucket) สำหรับเก็บรูปภาพหน้าคุณ หรือไฟล์รูปภาพ/PDF ของใบรับรองที่อัปโหลดผ่านหน้า Admin
