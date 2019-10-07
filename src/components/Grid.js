import React, { Component } from 'react'
import '../css/Grid.css'
import GridTiles from './GridTiles'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export class Grid extends Component {


    

  state = {
    inputs: {
      people: 0,
      cars_per_race: '',
      winners_per_race: ''
    },

    grid: [],

    pdfPreparing: false
  }



  savePDF = (people) => {

      const printArea = document.querySelector(".grid-wrap");

      html2canvas(printArea)
      .then(canvas => {

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
              orientation: 'portrait',
          });
          const imgProps= pdf.getImageProperties(imgData);
          let pdfHeight, pdfWidth
          if (imgProps.height/imgProps.width < 1.45 ){
              pdfWidth = pdf.internal.pageSize.getWidth();
              pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          } else {
              pdfHeight = pdf.internal.pageSize.getHeight();
              pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
          }
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight );
          pdf.save(`grid-${people}.pdf`);

      })
      .then(()=>{
          this.setState({pdfPreparing: false})

          document.body.style.position = "relative"
      })

  }



  
  
  getModelsRent = (people, cars_per_race, winners_per_race) => {

    let models_total = 0
    let people_arr = []
    people_arr.push(people)
    
    while (people_arr[people_arr.length-1] > cars_per_race) {
      models_total = models_total + people_arr[people_arr.length-1]
      if(people_arr[people_arr.length-1] !== Math.ceil(people_arr[people_arr.length-1]/cars_per_race) * winners_per_race){
        people_arr[people_arr.length] = Math.ceil(people_arr[people_arr.length-1]/cars_per_race) * winners_per_race

      }
      else break

    }

    console.log(people_arr)
    let grid = []


    people_arr.forEach((item)=>{
        
      if(item/cars_per_race > 2 && item/cars_per_race < 2.5){
          cars_per_race = cars_per_race-1
      }

      let nums_of_low_races
      if (item % cars_per_race === 0 || item < cars_per_race ) {
        
        nums_of_low_races = 0
      } else {
        nums_of_low_races = cars_per_race-(item % cars_per_race)
      }
      
      let grid_stage = []
      for (let i = 0; i < (item-(nums_of_low_races*(cars_per_race-1)))/cars_per_race; i++) {
        let grid_group = []
        if(item >= cars_per_race){

          for (let j = 0; j < cars_per_race; j++) {
            let driver = {
              name: ''
            }
            grid_group.push(driver)
            
          }
          grid_stage.push(grid_group)
        } else {
          for (let j = 0; j < item; j++) {
            let driver = {
              name: ''
            }
            grid_group.push(driver)
            
          }
          grid_stage.push(grid_group)
        }
      }

      if (item/cars_per_race <= 1.5 && item/cars_per_race > 1) {

          if(item%2 === 0){
              for (let i = 0; i < 2; i++) {
                  let grid_group = []
                  for (let j = 0; j < item/2; j++) {
                      let driver = {
                        name: ''
                      }
                      grid_group.push(driver)
                      
                    }
                    grid_stage.push(grid_group)
              }
          } else {

              let grid_group = []
              for (let j = 0; j < Math.floor(item/2); j++) {
                  let driver = {
                      name: ''
                  }
                  grid_group.push(driver)
              
              }
              grid_stage.push(grid_group)


              grid_group = []
              for (let j = 0; j < Math.ceil(item/2); j++) {
                  let driver = {
                      name: ''
                  }
                  grid_group.push(driver)
              
              }
              grid_stage.push(grid_group)
          }
          

      } else {

        for (let i = 0; i < nums_of_low_races; i++) {
          let grid_group = []
          for (let j = 0; j < cars_per_race-1; j++) {
              let driver = {
                name: ''
              }
              grid_group.push(driver)
              
            }
            grid_stage.push(grid_group)
        }
      }        

      grid.push(grid_stage)


      this.setState({grid})

    })
  }


  gridInit = (a,b,c) => {

    if(!isNaN(a) && !isNaN(b) && !isNaN(c) && a!==0 && b!==0 && c!==0 && a!=='' && b!=='' && c!==''){
      this.getModelsRent(parseInt(a),parseInt(b),parseInt(c))
    }
  }

  render() {

    const { people, cars_per_race, winners_per_race } = this.state.inputs
    const { grid, pdfPreparing } = this.state

    
    return (
      <div className="Grid">
          {pdfPreparing ?
              <div className="pdf-preparing">
                  <p>Your file is being prepared</p>
                  <img
                      className="preloader"
                      src={require("../img/preloader.gif")}
                      alt=""
                  />
              </div>
          :null}

        <div className="inputs_list">

          <div className="input_wrap">
            <div className="input-label">
              participants
            </div>
            <input
              onChange={(e)=>{
                  if (e.target.validity.valid){
                      this.setState({
                          inputs: {
                              ...this.state.inputs,
                              people: e.target.value,
                              cars_per_race: ''
                          }
                      })
                      this.gridInit(e.target.value, cars_per_race, winners_per_race)
                  }
              }}

              onBlur={(e)=>{
                  if (e.target.value === ''){
                      this.setState({
                          inputs: {
                              ...this.state.inputs,
                              people: 0,
                              cars_per_race: ''
                          }
                      })
                  }

              }}
              value={this.state.inputs.people}
              className="input-settings"
              type="tel"
              pattern="^-?[0-9]\d*\.?\d*$"
            />
          </div>


          <div className="input_wrap">
            <div className="input-label">
              group max 
            </div>
            <div className="select-wrap">
              <select
                onChange={(e)=>{
                  this.setState({
                    inputs: {
                      ...this.state.inputs,
                      cars_per_race: e.target.value
                    }
                  })
                  this.gridInit(people, e.target.value, winners_per_race)
                }}
                value={this.state.inputs.cars_per_race}
                className="select-settings"
              > 
                <option disabled={true} value="">0</option>
                <option disabled={parseInt(people)/4 <= 1.5 ? true : (typeof cars_per_race === 'string' ? false: true)} value="4">4</option>
                <option disabled={parseInt(people)/5 <= 1.5 ? true : (typeof cars_per_race === 'string' ? false: true)} value="5">5</option>
                <option disabled={parseInt(people)/6 <= 1.5 ? true : (typeof cars_per_race === 'string' ? false: true)} value="6">6</option>
              </select>
            </div>
          </div>
            {people/cars_per_race < 2}
          <div className="input_wrap">
            <div className="input-label">
              winners per group 
            </div>
            <div className="select-wrap">
              <select
                onChange={(e)=>{
                  this.setState({
                    inputs: {
                      ...this.state.inputs,
                      winners_per_race: e.target.value
                    }
                  })
                  this.gridInit(people, cars_per_race, e.target.value)
                }}
                value={this.state.inputs.winners_per_race}
                className="select-settings"
              >
                <option disabled={true} value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          
          {grid.length !== 0 && people !== '' && cars_per_race !== '' && winners_per_race !== '' ?
              <button 
                  className="generate-pdf"
                  onClick={()=>{
                      this.setState({pdfPreparing: true})
                      document.body.style.position = "fixed"

                      setTimeout(()=>{
                          this.savePDF(people)
                      }, 1000)
                      
                  }}
              >
                  download
                  <span>
                      <i className="far fa-file-pdf"></i>
                  </span>
                  PDF
              </button>
          :null}

        </div>
        <GridTiles
          ref={el => (this.componentRef = el)}
          people={people}
          cars_per_race={cars_per_race}
          winners_per_race={winners_per_race}
          grid={grid}
        />

      </div>
    );
  }
  }
  
  export default Grid
