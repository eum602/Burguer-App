import React, {Component} from 'react'
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal"


const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        constructor(props){//using constructor instead of componentDidMount so that we can
            //handle error when childComponents are loaded.It was before in componentDidMount
            //and was working well because interceptors where hanlding network error that user
            //made when clicking some button which occurs after ALL is loaded; but by suing this old approach we could
            //not have handled errors that occurs during loading because componentDidMount in this anonymous
            //component should have rendered after all its childs are rendered so interceptors should have been
            //rendered after errors ocurred. - l-211
            super(props)
            axios.interceptors.request.use(req=>{
                this.setState({error:null}) //whenever I send a request I clean any error.
                return req //returning the request so that the request can continue
            })
            axios.interceptors.response.use(res=>res, error=>{//res=>res means we do not do nothing with
                //the response and thus we return it to let continue the process in axios
                this.setState({error})
            })
        }
        state={
            error:null
        }        

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    } 
}
export default withErrorHandler