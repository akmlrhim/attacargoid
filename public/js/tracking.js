const API_URL = "https://resi.mellon.my.id/";

const awbInput = document.getElementById("awbInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");
const message = document.getElementById("message");

awbInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchAWB();
    }
});

function clearMessage() {
    message.className = "message";
    message.textContent = "";
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}

function formatDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function escapeHTML(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function searchAWB() {
    const awb = awbInput.value.trim();

    clearMessage();
    result.style.display = "none";

    if (!awb) {
        showMessage("Silakan masukkan nomor Resi terlebih dahulu.", "error");
        awbInput.focus();
        return;
    }

    searchButton.disabled = true;
    searchButton.innerHTML = '<span class="spinner"></span>Mencari...';

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Format data API tidak valid.");
        }

        const found = data.find((row) => {
            const rowAWB = row["no AWB"];

            return String(rowAWB || "").trim().toLowerCase() === awb.trim().toLowerCase();
        });

        if (!found) {
            showMessage(
                "Nomor Resi tidak ditemukan. Silakan periksa kembali nomor yang Anda masukkan.",
                "error",
            );
            return;
        }

        document.getElementById("resultAWB").textContent = found["no AWB"] || awb;
        document.getElementById("resultFrom").textContent = found["from"] || "-";
        document.getElementById("resultTo").textContent = found["to"] || "-";
        document.getElementById("resultSender").textContent = found["nama pengirim"] || "-";
        document.getElementById("resultReceiver").textContent = found["nama penerima"] || "-";
        document.getElementById("resultDate").textContent = formatDate(found["tanggal kirim"]) || "-";

        const timeline = document.getElementById("timeline");
        timeline.innerHTML = "";

        let historyCount = 0;

        for (let i = 1; i <= 6; i++) {
            const date = found[`tanggal update ${i}`];
            const location = found[`lokasi ${i}`];
            const status = found[`status ${i}`];

            if (!date && !location && !status) {
                continue;
            }

            historyCount++;

            const item = document.createElement("div");
            item.className = "timeline-item";
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${escapeHTML(formatDate(date)) || "-"}</div>
                    <div class="timeline-location">
                        📍 ${escapeHTML(location) || "lokasi belum tersedia"}
                    </div>
                    ${status ? `<div class="timeline-status">${escapeHTML(status)}</div>` : ""}
                </div>
            `;

            timeline.appendChild(item);
        }

        if (historyCount === 0) {
            timeline.innerHTML = '<div class="no-history">Belum ada riwayat lokasi pengiriman.</div>';
        }

        result.style.display = "block";

        setTimeout(() => {
            result.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    } catch (error) {
        console.error(error);
        showMessage("Terjadi kesalahan saat mengambil data dari database. Silakan coba lagi.", "error");
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Cari";
    }
}
