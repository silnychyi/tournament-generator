import React, { Component } from 'react'

export class GridTiles extends Component {
    render() {
        const { grid, people, cars_per_race, winners_per_race } = this.props
        return (
            <div className="grid-overlay">
                {grid.length !== 0 && people !== '' && cars_per_race !== '' && winners_per_race !== '' ?
                    <div className="grid-wrap">

                        


                        {grid.map((stage, i)=>{

                            
                            return (
                            <div key={i} className="grid-stage">
                                <div className="grid-stage-title">
                                <div className="stage-title-num">
                                    {grid.length-1 === i ? "Final" : (grid.length-2 === i ? "Semi-Final" : `Tour ${i+1}`)}
                                </div>
                                <div className="stage-title-subline">{`Participants: ${stage.flat(3).length}`}</div>
                                <div className="stage-title-subline">{`Groups: ${stage.length}`}</div>
                                </div>

                                {stage.length > 8 ?
                                
                            
                                <div className="grid-stage-list-wrap">

                                    {Array.from({length: Math.ceil(stage.length/8)}, (_,i)=>{

                                        return stage.slice(i*8, (i*8)+8)
                                    }).map((stage, b)=>{

                                        return (
                                        
                                            <div key={b} className="grid-stage-list">
                                                {stage.map((group, j)=>{
                                                    return (
                                                        <div key={j} className="grid-group">
                                                            {group.map((driver, k)=>{
                                                                return (
                                                                <div key={k} className="grid-driver-wrapper">
                                                                    <div className="grid-driver-num">
                                                                    {k+1}
                                                                    </div>
                                                                    <input 
                                                                        className="grid-driver"
                                                                        type="text"
                                                                    />
                                    
                                                                    
                                                                </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}

                                </div>
                            
                                :
                                <div className="grid-stage-list-wrap">
                                    
                                    <div className="grid-stage-list">
                                        {stage.map((group, j)=>{
                                            return (
                                                <div key={j} className="grid-group">
                                                    {group.map((driver, k)=>{
                                                        return (
                                                        <div key={k} className="grid-driver-wrapper">
                                                            <div className="grid-driver-num">
                                                            {k+1}
                                                            </div>
                                                            <input 
                                                                className="grid-driver"
                                                                type="text"
                                                            />
                            
                                                            
                                                        </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                            </div>
                            )
                        })}
                    </div>
                :null}
            </div>
        )
    }
}

export default GridTiles
