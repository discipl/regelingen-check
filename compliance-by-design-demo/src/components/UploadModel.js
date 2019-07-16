import React, {Component} from 'react'
import * as Papa from 'papaparse'
import ModelView from "./ModelView";
import readXlslxFile from 'read-excel-file'


class UploadModel extends Component {
    constructor(props){
        super(props)

        this.downloadJson = typeof this.props.location.search === 'string' && this.props.location.search.includes('download')
        this.state = {}
    }
    async processModel(event) {
        const model = event.target.files[0].name.includes('xls') ?
            await this.processExcel(event.target.files[0]) :
            await this.processCsv(event);
        if (this.downloadJson) {
            const filename = 'model.json'
            const contentType = 'application/json;charset=utf-8;'
            const a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(model, null, 2));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            this.setState({
                ...this.state,
                'model': model
            })
        }

    }

    async processCsv(event) {
        console.log(Array.from(event.target.files))

        let parsedArrays = await Promise.all(Array.from(event.target.files).map((inputFile) =>
            new Promise((resolve, reject) => {
                Papa.parse(inputFile,
                    {'complete': (result) => resolve(result.data)})
            })
        ))

        const resultObjectArrays = parsedArrays.map((parsedArray) => this.doubleArrayToObjectArray(parsedArray))

        console.log(resultObjectArrays)

        const acts = resultObjectArrays.filter((array) => Object.keys(array[0]).includes('act'))[0].filter(act => act['act'] != null && act['act'] !== '')
        const facts = resultObjectArrays.filter((array) => Object.keys(array[0]).includes('fact'))[0].filter(fact => fact['fact'] != null && fact['fact'] !== '')
        const duties = resultObjectArrays.filter((array) => Object.keys(array[0]).includes('duty'))[0].filter(duty => duty['duty'] != null && duty['duty'] !== '')

        return {
            'acts': acts,
            'facts': facts,
            'duties': duties
        };
    }

    async processExcel(file) {
        const result = {}
        const sheets = ['acts', 'facts', 'duties']
        const keyParts = {
            'acts': 'act',
            'facts': 'fact',
            'duties': 'duty'
        }
        for (let sheet of sheets) {
            const parsed = await readXlslxFile(file, {'sheet': sheet})
            const parsedObjects = this.doubleArrayToObjectArray(parsed, true)
            result[sheet] = parsedObjects.filter(item => item[keyParts[sheet]] != null && item[keyParts[sheet]] !== '')
        }
        console.log('excel results', result)
        return result
    }

    doubleArrayToObjectArray(doubleArray, fixWhitespace = false) {
        const result = []
        const numRows = doubleArray.length
        const numCols = doubleArray[0].length

        for (let row = 1; row < numRows; row++) {
            let resultObject = {}
            for (let col = 0; col < numCols; col++ ) {
                let value = doubleArray[row][col]
                if (typeof value === 'string' && fixWhitespace) {
                    value = doubleArray[row][col].replace(/_x000D_/g, ' ')
                }

                resultObject[doubleArray[0][col]] = value
            }
            result.push(resultObject)
        }


        return result
    }

    render() {
        if (this.state.model) {
            return (
                <ModelView model={this.state.model}/>
            )
        }
        return (
            <div>
            <input type='file' onChange={this.processModel.bind(this)} required multiple/>
        </div>
        )
    }
}

export default UploadModel