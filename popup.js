document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const resultDiv = document.getElementById("result");

  fileInput.addEventListener("change", async function () {
    const file = fileInput.files[0];
    if (!file) return;

    const text = await file.text();
    const flags = [];

    if (!text.includes("@fiverr.com")) 
      flags.push("🔻 Sender domain doesn't match official Fiverr domain.");
    if (text.includes("kidfv.cc")) 
      flags.push("🔻 Suspicious URL found: kidfv.cc");
    if (/Have quastions\?/i.test(text)) 
      flags.push("🔻 Misspelled phrase detected: 'Have quastions?'—looks sketchy.");
    if (text.includes("Go further")) 
      flags.push("🔻 CTA uses vague language—'Go further' is bait.");
    if (!text.toLowerCase().includes("unsubscribe")) 
      flags.push("🔻 Missing unsubscribe footer—standard for legit newsletters.");

    const isPhishing = flags.length > 0;

    resultDiv.innerHTML = `
      <h2 class="text-xl font-semibold mb-2 ${isPhishing ? 'text-red-600' : 'text-green-600'}">
        ${isPhishing ? "⚠️ Phishing Detected!" : "✅ This email looks clean."}
      </h2>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        ${flags.map(flag => `<li>${flag}</li>`).join("")}
      </ul>
    `;
  });
});
