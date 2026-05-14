 let currentBalance = 10000;
        let currentAction = '';
        const correctPin = '1234';

        function updateBalance() {
            document.getElementById('balance').textContent = `Balance: $${currentBalance.toLocaleString()}`;
        }

        function showPinModal(action) {
            const amount = parseFloat(document.getElementById('amountInput').value);
            
            // Validate amount is multiple of 100
            if (amount % 100 !== 0 || amount <= 0) {
                alert('Amount must be a multiple of 100 and greater than 0!');
                return;
            }

            // Check sufficient balance for withdraw
            if (action === 'withdraw' && amount > currentBalance) {
                alert('Insufficient balance!');
                return;
            }

            currentAction = action;
            document.getElementById('modalTitle').textContent = `Enter PIN to ${action.charAt(0).toUpperCase() + action.slice(1)}`;
            document.getElementById('pinModal').style.display = 'block';
            document.getElementById('pinInput').focus();
            document.getElementById('errorMsg').style.display = 'none';
            document.getElementById('successMsg').style.display = 'none';
        }

        function confirmTransaction() {
            const pin = document.getElementById('pinInput').value;
            const amount = parseFloat(document.getElementById('amountInput').value);
            const errorMsg = document.getElementById('errorMsg');
            const successMsg = document.getElementById('successMsg');

            if (pin !== correctPin) {
                errorMsg.textContent = 'Incorrect PIN!';
                errorMsg.style.display = 'block';
                return;
            }

            // Process transaction
            if (currentAction === 'withdraw') {
                currentBalance -= amount;
            } else {
                currentBalance += amount;
            }

            updateBalance();
            
            // Clear input and close modal
            document.getElementById('amountInput').value = '';
            document.getElementById('pinInput').value = '';
            document.getElementById('pinModal').style.display = 'none';

            // Show success message
            successMsg.textContent = `Transaction successful! New balance: $${currentBalance.toLocaleString()}`;
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('pinModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Enter key support for PIN
        document.getElementById('pinInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                confirmTransaction();
            }
        });

        // Initial balance update
        updateBalance();