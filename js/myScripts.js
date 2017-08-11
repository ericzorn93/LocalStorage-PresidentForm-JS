/**
 * Created by ericzorn on 8/10/17.
 *
 * Eric Zorn, Module 9: Optional Local Storage Assignment with President Form, ICT 4570: Webscripting with JavaScript
 */

window.addEventListener('load', function () {
    "use strict";

    function getLocalStorage() {
        return {
            currentCycle: parseInt(localStorage.getItem("currentCycle")),
            totalVotes: parseInt(localStorage.getItem("totalVotes"))
        };
    }

    var localStorageData = getLocalStorage();

    var currentCycle = localStorageData.currentCycle || 0;

    var votesCurrentCycle = votingData.voting[currentCycle];


    var candidateInputs = [
        document.getElementById("cand1"),
        document.getElementById("cand2"),
        document.getElementById("cand3")
    ];

    var parties = [
        document.getElementById("party1"),
        document.getElementById("party2"),
        document.getElementById("party3")
    ];

    var votes = [
        document.getElementById('votes1'),
        document.getElementById('votes2'),
        document.getElementById('votes3')
    ];

    var percents = [
        document.getElementById("cand1pct"),
        document.getElementById("cand2pct"),
        document.getElementById("cand3pct"),
    ];

//Here is the total votes
    var totalVotes = document.getElementById("totalvotes");
    totalVotes.value = localStorageData.totalVotes || calculateTotalVotes();


//Set Names in Inputs

    for (var i = 0; i < votingData.candidates.length; i+= 1) {
        candidateInputs[i].value = votingData.candidates[i].name;

        parties[i].value = votingData.candidates[i].party;
    }


    function calculateTotalVotes() {
        var votesFirst= votes[0].value = votesCurrentCycle[0];
        var votesSecond = votes[1].value = votesCurrentCycle[1];
        var votesThird = votes[2].value = votesCurrentCycle[2];
        var totalVotes = votesFirst + votesSecond + votesThird;
        localStorage.setItem("totalVotes", totalVotes);


        return totalVotes;
    }


    function cycle() {
        if (isThereNextCycle()) {
            var timeDelayMs = 5000; //5 Seconds
            getNextCycleVotes();
            totalVotes.value = calculateTotalVotes();
            votePercentage();
            setTimeout(cycle, timeDelayMs);
        }
    }

    function getNextCycleVotes() {
        votesCurrentCycle = votingData.voting[++currentCycle];
        localStorage.setItem("currentCycle", currentCycle);
    }

    function isThereNextCycle() {
        return votingData.voting.length > currentCycle + 1;
    }




//Vote Percentage
    function votePercentage() {
        var percent1 = (votes[0].value / totalVotes.value) * 100;
        var percent2 = (votes[1].value / totalVotes.value) * 100;
        var percent3 = (votes[2].value / totalVotes.value) * 100;

        percents[0].value = parseFloat(percent1).toFixed(2) + "%";
        percents[1].value = parseFloat(percent2).toFixed(2) + "%";
        percents[2].value = parseFloat(percent3).toFixed(2) + "%";
    }


//Date Set
    document.getElementById("date").value = votingData.electionDate;

//Calls the final Cycle Function
    document.onload = cycle();

//Update the description
    document.getElementById('productDescription').innerHTML = 'Project Description: ' + "<em style='text-decoration:underline;'>" + votingData.electionDescription + "</em>";

//Update Election ID
    document.getElementById('electionID').innerHTML =  "Election ID: " + "<em style='text-decoration:underline;'>" + votingData.electionId + '</em>';

//Wikipedia
    function electionWiki() {
        var electionSubmit = document.getElementById('submit');

        electionSubmit.addEventListener('click', function() {
            const url = 'https://en.wikipedia.org/wiki/United_States_presidential_election,_1948';

            window.open(url, '_blank');
        });
    }

    electionWiki();

//Console Log Finished
    console.log(document.body.onload = 'The data has been loaded successfully!');
});

