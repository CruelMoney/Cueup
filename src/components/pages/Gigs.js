import React, { PropTypes } from 'react'
import Button from '../common/Button-v2'
import Gig from '../../containers/Gig'




var Gigs = React.createClass({
  propTypes: {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
  },
  contextTypes:{
    registerActions: PropTypes.func,
  },

  getInitialState(){
    return{
      gigs: [],
      filter: "requested"
    }
  },

  componentWillMount() {
    if (this.props.gigs !== undefined) {
      this.setState({
        gigs: this.props.gigs
      })
      if (this.props.gigs.length === 0) {
        this.props.fetchGigs()
      }
    }
    this.context.registerActions(this.getActionButtons())
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.gigs !== undefined) {
    this.setState({
      gigs: nextprops.gigs
    })
  }
  },

  componentWillUnmount() {
    this.setState({
      gigs: []
    })
  },

  getActionButtons(props = this.props){
    return (
    <div
      className="context-actions"
      key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <Button
          name="requested"
          active={this.state.filter === "requested"}
          onClick={()=>{
            this.setState({
              filter: "requested"
            })
          }}
        >Requested</Button>
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          name="upcoming"
          active={this.state.filter === "upcoming"}
          onClick={()=>{
            this.setState({
              filter: "upcoming"
            })
          }}
        >Upcoming</Button>
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          name="lost"
          active={this.state.filter === "lost"}
          onClick={()=>{
            this.setState({
              filter: "lost"
            })
          }}
        >Lost</Button>
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          name="finished"
          active={this.state.filter === "finished"}
          onClick={()=>{
            this.setState({
              filter: "finished"
            })
          }}
        >Finished</Button>
      </div>


      <div style={{marginBottom:"4px"}}>
        <Button
          name="request_features"
          onClick={()=>{
            console.log("not implemented");
          }}
        >Request features</Button>
      </div>

    </div>

    )
  },

  render() {

    var finishedGigs = []
    var lostGigs = []
    var requestedGigs = []
    var upcomingGigs = []

    this.state.gigs.forEach(function(gig, i) {
      switch (gig.status) {
        case 'Finished':
          finishedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Accepted':
          requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Confirmed':
          upcomingGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Requested':
          requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Lost':
          lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Cancelled':
          //lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        default:

      }
    })

    const renderGigs = (gigs) => {
      if (gigs.length === 0) {
        return <div
          className="no-gigs"
               >
          No {this.state.filter} gigs.
        </div>
      }else {
        return gigs
      }
     }

    return(
      <div>
        {this.state.filter === "upcoming" ?
          renderGigs(upcomingGigs)
        : null}
        {this.state.filter === "finished" ?
          renderGigs(finishedGigs)
        : null}
        {this.state.filter === "requested" ?
          renderGigs(requestedGigs)
        : null}
        {this.state.filter === "lost" ?
          renderGigs(lostGigs)
        : null}


      </div>)

  }
})
export default Gigs
