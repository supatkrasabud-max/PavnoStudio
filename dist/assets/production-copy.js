(() => {
  const replacements = [
    ['DEMO เท่านั้น · ไม่ใช่ WordPress ที่ติดตั้งจริง · ข้อมูลเก็บในเบราว์เซอร์นี้ · ไม่รับเงินจริง · กรุณาใช้ข้อมูลสมมติ', 'PAVNO DIGITAL · ระบบจัดการสินค้า คำสั่งซื้อ และข้อมูลร้านค้า'],
    ['WORKSPACE / ร้านทดลอง', 'WORKSPACE / PAVNO DIGITAL'],
    ['รายชื่อตัวอย่าง', 'รายชื่อจาก Landing Page'],
    ['เริ่มเดโมใหม่', 'เริ่มใหม่'],
    ['ต้นแบบการทำงานเพื่อทดลองก่อนติดตั้งระบบจริง · ไม่เชื่อมการชำระเงินหรือแพลตฟอร์มโฆษณา', 'ระบบจัดการร้าน PAVNO DIGITAL'],
    ['PAVNO Studio — ทดลองจัดการร้าน', 'PAVNO Studio — จัดการร้าน'],
    ['PAVNO / DEMO WORKSPACE', 'PAVNO / STORE ADMIN'],
    ['สินค้าในเดโม', 'สินค้าทั้งหมด'],
    ['คำสั่งซื้อทดลอง', 'คำสั่งซื้อ'],
    ['บันทึกสินค้าในเดโม', 'บันทึกสินค้า'],
    ['แสดงในเดโม', 'เผยแพร่'],
    ['สินค้าเผยแพร่จะแสดงในหน้าร้านเดโม', 'สินค้าเผยแพร่จะแสดงในหน้าร้าน'],
    ['ร้านทดลอง', 'ร้านของคุณ'],
    ['ราคาในเดโม', 'ราคา'],
    ['QR ทดลอง', 'QR ชำระเงิน'],
    ['บันทึกแคมเปญทดลอง', 'บันทึกแคมเปญ'],
    ['หน้าร้านสาธิต', 'หน้าร้าน'],
    ['ตะกร้าสินค้าทดลอง', 'ตะกร้าสินค้า'],
    ['ยอดรวมสมมติ', 'ยอดรวม'],
    ['ทดลองใส่ตะกร้าได้', 'ใส่ตะกร้าได้'],
    ['ยังไม่มีคำสั่งซื้อทดลอง', 'ยังไม่มีคำสั่งซื้อ'],
    ['เริ่มเดโมใหม่', 'เริ่มใหม่'],
  ];

  function replaceText(node) {
    if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;
    let value = node.nodeValue;
    for (const [from, to] of replacements) value = value.split(from).join(to);
    if (value !== node.nodeValue) node.nodeValue = value;
  }

  function refresh(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceText);
    document.title = document.title.replace('ทดลองจัดการร้าน', 'จัดการร้าน');
  }

  refresh();
  new MutationObserver(records => records.forEach(record => {
    record.addedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) replaceText(node);
      else if (node.nodeType === Node.ELEMENT_NODE) refresh(node);
    });
  })).observe(document.body, { childList: true, subtree: true });
})();
