function main() {
    let cats = [];

    function get_cats() {
        const cats_html = document.getElementsByClassName('cat-cell')
        for (let each of cats_html) {
            cats.push(each.innerHTML)
        }
    }

    get_cats()

    let qs = document.getElementsByClassName('grid-row-questions')
    let questions = []
    let answers = []
    for (let rows of qs) {
        let row_questions = []
        let row_answers = []
        let row_h = rows.children
        let first = true
        for (let cell_g of row_h) {
            let cell = cell_g.querySelector('.cell')
            let points = cell.querySelector('.points').innerHTML
            let text = cell.querySelector('.answer').innerHTML
            let answer = cell.querySelector('.question').innerHTML
            row_questions.push(text)
            row_answers.push(answer)
            if (first === true) {
                row_questions.unshift(points)
                row_answers.unshift(points)
            }
            first = false
        }
        questions.push(row_questions)
        answers.push(row_answers)
    }
    console.log(questions)
    console.log(answers)

    function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                ;
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    function build_final_list() {
        let csv = []
        csv.push(cats)
        csv[0].unshift("Questions")
        for (let each of questions) {
            csv.push(each)
        }
        let c2 = cats.slice()
        c2.shift()
        csv.push(c2)
        csv[csv.length - 1].unshift("Answers")
        for (let each of answers) {
            csv.push(each)
        }
        exportToCsv("JeopardyLabs", csv)
    }

    build_final_list()
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request === "go"){
            main()
        }
    }
);