
import {  useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { saveExerciseLog } from "../services/UserService";
import { NaviBar } from "./NaviBar";
import Footer from "./Footer";

export function ExerciseLog(){
    const[formData,setFormData]=useState({username:"",description:"",duration:"",date:""});
    const [isSubmitted,setIsSubmitted]=useState(false);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const result = await saveExerciseLog(formData);
        setFormData({username:"",description:"",duration:"",date:""});
        setIsSubmitted(true);
        setTimeout(()=>{
         setIsSubmitted(false)
        },1500);
        console.log(result.message);
    }catch(error){
     console.log(error)
    }
}
    return(
        <>
        <NaviBar></NaviBar>
        <Container className="bi">
            <Form  onSubmit={handleSubmit}>
                <h2 className="mb-3 mt-5">Create New Exercise Log !!!</h2>
                <Form.Group controlId="formUserName" className="lg-12">
                    <Form.Label><b>User Name : </b></Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={isSubmitted?formData.username:null}  name="username" onKeyUp={handleChange} />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-4">
                    <Form.Label><b>Description : </b></Form.Label>
                    <Form.Control type="text" placeholder="Enter description"  value={isSubmitted?formData.description:null} name="description" onKeyUp={handleChange} />
                </Form.Group>

                
                <Form.Group controlId="formDuration" className="mt-4">
                    <Form.Label><b>Duration (in minutes) : </b></Form.Label>
                    <Form.Control type="text" placeholder="Enter duration"  value={isSubmitted?formData.duration:null} name="duration" onKeyUp={handleChange} />
                </Form.Group><br></br>

                {/* <Form.Group controlId="formDate" className="mt-4" name="date" onKeyUp={handleChange}>
                    <Form.Label><b>Date : </b></Form.Label>
                    <Form.Control type="date" />
                    
                </Form.Group><br/> */}
                    <label htmlFor="date"><b>Date : </b></label>
                    <input
                            type="date"
                            id="dateInput"
                            value={isSubmitted?formData.date:null}
                            name="date"
                            onChange={handleChange}
                         
                            />
                        <br></br>
                <Button variant="primary" type="submit" className="mt-4" >
                    Create Exercise Log
                </Button>
            </Form>
            <Row className="mt-4">
            <Col lg={4}>
            {isSubmitted?<Alert variant="success">Your Log is Registered !!!</Alert>:null}
            </Col>
            </Row>
        </Container>
        <Footer></Footer>
        </>
    );
}