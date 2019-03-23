// get the user data from the page
let nameValue;
let stateValue;
let tuitionValue;
let typeValue;
let button = $("#submitb");
//when user submit data
button.on("click", function () {
    d3.csv("./data/data.csv", function (d) {
        return {
            name: d.INSTNM,
            website: d.INSTURL,
            state: d.STABBR,
            religion: d.RELAFFIL,
            instate: d.TUITIONFEE_IN,
            outstate: d.TUITIONFEE_IN,
            city: d.CITY
        };
    }).then(function (data) {
        const filtered = [];
        let inputName = $('#InputName');
        nameValue = inputName.val();
        let inputState = $("#InputState");
        stateValue = inputState.val();
        let inputTuition = $("#InputTuition");
        tuitionValue = inputTuition.val();
        let inputType = $("#SearchReligion");
        typeValue = inputType.val();
        let resultPanel = $(".resultpanel");
        if (typeValue == "1") {
            typeValue = "Yes";
        } else if (typeValue == "2") {
            typeValue = "NULL";
        }

        // if user did not finish inputing
        if (nameValue == "" || stateValue == "" || tuitionValue == "" || typeValue == "0") {
            var instruction = $(".instruction");
            instruction.remove();
            var warning = $("<p>");
            warning.addClass("warning");
            warning.text("Please fill in all the information and make sure value input is reseasonable.");
            resultPanel.append(warning);
        } else {
            resultPanel.html('');
            for (var key in data) {
                if (data[key]["religion"] != "NULL") {
                    data[key]["religion"] = "Yes";
                }
                if (data[key]["state"] == stateValue.toUpperCase() && data[key]["religion"] == typeValue && data[key]["name"].toUpperCase().includes(nameValue.toUpperCase()) && (parseInt(data[key]["outstate"]) <= tuitionValue)) {
                    filtered.push(data[key]);
                }
            }
            if (filtered.length == 0) {
                var check = $("<p>");
                check.addClass("warning");
                check.text("There is no school that meets your requirement. Please try again.");
                resultPanel.append(check)
            } else {
                let table = $("<table>");
                let tr = $("<tr>")
                tr.append($("<th>").html("<p>Name</p>"), $("<th>").html("<p>City</p>"), $("<th>").html("<p>State</p>"), $("<th>").html("<p>Religon</p>"), $("<th>").html("<p>Instate Tuition</p>"), $("<th>").html("<p>Outstate Tuition</p>"));
                table.append(tr);
               for (let key in filtered) {
                let dataTr = $("<tr>");

                    let nameEle = $("<td>");
                    nameEle.html('<a href="'+filtered[key]["website"]+'" target="_blank" '+
                    'rel="noopener">'+filtered[key]["name"]+'</a>');


                    let cityEle = $("<td>");
                    cityEle.text(filtered[key]["city"]);


                    let stateEle = $("<td>");
                    stateEle.text(filtered[key]["state"]);

                    let religionEle = $("<td>");
                    religionEle.text(filtered[key]["religion"]);


                    let inEle = $("<td>");
                    inEle.text(filtered[key]["instate"]);

                    let outEle = $("<td>");
                    outEle.text(filtered[key]["outstate"]);

                dataTr.append(nameEle, cityEle, stateEle, religionEle, inEle, outEle);
                table.append(dataTr);
                }
                resultPanel.append(table);
                console.log(filtered);
            }
        }
        console.log(filtered);
    });
});







