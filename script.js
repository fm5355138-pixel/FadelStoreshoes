function toggleReplyForm(button) {
    const reviewItem = button.closest('.review-item');
    const replyContainer = reviewItem.querySelector('.reply-form-container');
    replyContainer.classList.toggle('active');
    button.textContent = replyContainer.classList.contains('active') ? 'Batal Balas' : 'Balas';
}

function submitOwnerReply(button) {
    const form = button.closest('.reply-form');
    const reviewItem = button.closest('.review-item');
    const replyText = form.querySelector('textarea').value.trim();

    if (replyText) {

        const existingReply = reviewItem.querySelector('.owner-reply-container');
        if (existingReply) {
            existingReply.remove();
        }

        const newReplyContainer = document.createElement('div');
        newReplyContainer.className = 'owner-reply-container';
        newReplyContainer.innerHTML = `
            <div class="owner-reply-header">Dibalas oleh Fadel Store (Admin)</div>
            <div class="owner-reply-text">${replyText}</div>
        `;
        

        reviewItem.insertBefore(newReplyContainer, form.closest('.reply-form-container'));

        form.querySelector('textarea').value = '';
        toggleReplyForm(reviewItem.querySelector('.reply-button'));
    } else {
        alert('Balasan tidak boleh kosong.');
    }
}

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    if (!ratingInput) {
        alert('Mohon berikan penilaian bintang.');
        return;
    }
    const ratingValue = ratingInput.value;
    const reviewText = document.getElementById('review-text').value;

    const date = new Date();
    const formattedDate = `${date.getDate()} ${['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][date.getMonth()]} ${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} WIB`;
    
    const stars = '⭐'.repeat(parseInt(ratingValue));

    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.style.animationDelay = '0s'; 
    newReview.setAttribute('data-rating', ratingValue);

    newReview.innerHTML = `
        <div class="rating">${stars}</div>
        <p class="review-text">"${reviewText}"</p>
        <div class="reviewer-info">
            <span class="reviewer-name">- ${name}</span>
            <span class="review-date">${formattedDate}</span>
        </div>
        <button class="reply-button" onclick="toggleReplyForm(this)">Balas</button>
        <div class="reply-form-container">
            <form class="reply-form">
                <textarea placeholder="Tulis balasan Anda..." rows="3" required></textarea>
                <button type="button" onclick="submitOwnerReply(this)">Kirim Balasan</button>
            </form>
        </div>
    `;

    const reviewGrid = document.getElementById('reviewGrid');
    reviewGrid.insertBefore(newReview, reviewGrid.firstChild); 

    this.reset();
    
    const summaryElement = document.getElementById('reviewSummary');
    let currentReviews = parseInt(summaryElement.textContent.match(/\d+\sUlasan/)[0].split(' ')[0]);
    summaryElement.textContent = ` 4,81 ⭐⭐⭐⭐⭐ - ${currentReviews + 1} Ulasan `;
});


window.toggleReplyForm = toggleReplyForm;
window.submitOwnerReply = submitOwnerReply;