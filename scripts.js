const conversation = [
    {
        id: 1,
        message: "Καλησπέρα! Θέλεις να ενημερωθείς για την επιχορήγηση αγροτικών εκμεταλλεύσεων;",
        options: [
            { text: "Ναι, πες μου περισσότερα", nextId: 2 },
            { text: "Όχι, ευχαριστώ", nextId: 5 }
        ]
    },
    {
        id: 2,
        message: "Η επιχορήγηση αφορά παραγωγούς που έχουν υποστεί ζημιές σε φυτικά μέσα παραγωγής. Θες να μάθεις αν δικαιούσαι;",
        options: [
            { text: "Ναι, πώς μπορώ να μάθω;", nextId: 3 },
            { text: "Όχι, θέλω απλώς πληροφορίες για τα δικαιολογητικά", nextId: 4 }
        ]
    },
    {
        id: 3,
        message: "Αν είσαι εγγεγραμμένος στον ΕΛΓΑ και έχεις υποβάλει δήλωση ΟΣΔΕ, μπορείς να υποβάλεις αίτηση ενίσχυσης. Θες να δεις πού γίνεται η υποβολή;",
        options: [
            { text: "Ναι, δείξε μου το link", nextId: 6 },
            { text: "Όχι, θα το ψάξω μόνος μου", nextId: 5 }
        ]
    },
    {
        id: 4,
        message: "Για την αίτηση χρειάζονται: δελτίο ταυτότητας, δήλωση ΟΣΔΕ, περιγραφή ζημιών και φωτογραφίες.",
        options: [
            { text: "Ευχαριστώ!", nextId: 5 }
        ]
    },
    {
        id: 5,
        message: "Σε ευχαριστώ που χρησιμοποίησες το σύστημα! Μπορείς να επισκεφθείς το www.elga.gr για περισσότερες πληροφορίες."
    },
    {
        id: 6,
        message: "Η αίτηση υποβάλλεται εδώ: https://www.elga.gr. Καλή επιτυχία!"
    }
];

const faq = [
    { question: "Ποιοι δικαιούνται επιχορήγηση;", answer: "Δικαιούνται οι γεωργοί και κτηνοτρόφοι που έχουν υποστεί αποδεδειγμένες ζημιές." },
    { question: "Πώς μπορώ να υποβάλω αίτηση;", answer: "Η αίτηση υποβάλλεται ηλεκτρονικά μέσω της πλατφόρμας του ΕΛΓΑ ή στο τοπικό υποκατάστημα." },
    { question: "Ποια δικαιολογητικά χρειάζονται;", answer: "Απαιτούνται: δελτίο ταυτότητας, δήλωση ΟΣΔΕ, περιγραφή ζημιών και φωτογραφική τεκμηρίωση." }
];

let currentId = 1;

function showMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions(options) {
    options.forEach(option => {
        showMessage(option.text, "bot");
    });
}

function sendMessage() {
    const input = document.getElementById("user-text");
    const text = input.value;
    if (!text) return;
    showMessage(text, "user");

    // Αναζήτηση επιλογής που ταιριάζει
    const conv = conversation.find(c => c.id === currentId);
    if (conv && conv.options) {
        const selected = conv.options.find(o => o.text.toLowerCase() === text.toLowerCase());
        if (selected) {
            currentId = selected.nextId;
        } else {
            currentId = conv.options[0].nextId; // default next
        }
    } else {
        currentId += 1;
    }

    const next = conversation.find(c => c.id === currentId);
    if (next) {
        showMessage(next.message, "bot");
    }

    input.value = "";
}

// Αρχικό μήνυμα
window.onload = () => {
    const first = conversation.find(c => c.id === 1);
    showMessage(first.message, "bot");
};
