
        function formatNumber(value) {
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function calculateDTI() {
            // Get input values
            var monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value.replace(/,/g, ""));
            var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value.replace(/,/g, ""));
            var annualBonus = parseFloat(document.getElementById("annualBonus").value.replace(/,/g, "")) || 0;  // Default to 0 if empty
            var additionalIncome = parseFloat(document.getElementById("additionalIncome").value.replace(/,/g, "")) || 0;  // Default to 0 if empty
            var annualDebt = parseFloat(document.getElementById("annualDebt").value.replace(/,/g, "")) || 0;  // Default to 0 if empty
            var housingCosts = parseFloat(document.getElementById("housingCosts").value.replace(/,/g, "")) || 0;  // Default to 0 if empty

            // Validate mandatory inputs
            if (isNaN(monthlyIncome) || isNaN(monthlyDebt) || monthlyIncome <= 0 || monthlyDebt < 0) {
                alert("Please enter valid numbers for Monthly Income and Monthly Debt Payments.");
                return;
            }

            // Calculate total monthly income and monthly debt
            var totalMonthlyIncome = monthlyIncome + annualBonus / 12 + additionalIncome;
            var totalMonthlyDebt = monthlyDebt + annualDebt / 12 + housingCosts;

            // Calculate Debt to Income ratio
            var dtiRatio = (totalMonthlyDebt / totalMonthlyIncome) * 100;

            // Display the result
            document.getElementById("dtiResult").innerHTML = "Your Debt-to-Income Ratio is: " + dtiRatio.toFixed(2) + "%";

            // Give a recommendation based on DTI ratio
            var recommendation = '';
            if (dtiRatio < 36) {
                recommendation = 'Your DTI ratio is in a healthy range.';
            } else if (dtiRatio >= 36 && dtiRatio <= 43) {
                recommendation = 'You may be considered for loans, but you might need to work on reducing debt.';
            } else {
                recommendation = 'Your DTI ratio is high.';
            }
            document.getElementById("dtiRecommendation").innerHTML = recommendation;
        }

        function addCommas(event, elementId) {
            var value = document.getElementById(elementId).value.replace(/,/g, "");
            value = formatNumber(value);
            document.getElementById(elementId).value = value;
        }
    