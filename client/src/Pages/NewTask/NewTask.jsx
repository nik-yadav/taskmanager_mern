import React from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewTask = () => {

    const navigate = useNavigate()

    const initialFormValues = {
        title:"",
        assigned:"",
        priority: "high",
        description:"",
        taskCategory:"ToDo",
    }

    const addNewTask = async (values) => {

        const { title, assigned, priority, description, taskCategory } = values;
        console.log(values);
        //call api to add new product
        try {
            const url = 'http://localhost:8000/data/insertdata';
            const response = await axios.post(url,{
                    title: title,
                    assigned: assigned, 
                    priority: priority,
                    description: description,
                    taskCategory: taskCategory,
            });
            console.log(response.data);
            if(response.data.success === true){
                navigate('/');
                toast.success('Task added successfully!');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <h2 className='mb-3 bg-info text-dark p-3 d-flex justify-content-center'>Task Details</h2>

            <Formik
                 initialValues={initialFormValues}
                 onSubmit={async (values, { resetForm }) => {
                    //console.log(values);
                    const { error } = await addNewTask(values);
                    if (!error) {
                        alert("Data Submitted")
                        // resetForm();
                    };
                 }}
            >
                <div className='m-4 row '>
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="title_value" className='col-4 my-2'>Title:</label>
                            <Field name="title" type="text" className='col-8' required />
                        </div>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Assigned To</label>
                            <Field name="assigned" type="text" className='col-8' required />
                        </div>
                        <div className='row'>
                            <label htmlFor="priority" className='col-4 my-2'>Priority</label>
                            <div className='col-8'>
                                <Field name="priority" as="select" className='form-select' required>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </Field>
                            </div>
                        </div>

                        <div className='row'>
                            <label htmlFor="taskCategoryvalue" className='col-4 my-2'>Task Category</label>
                            <div className='col-8'>
                                <Field name="taskCategory" as="select" className='form-select' required>
                                    <option value="ToDo">ToDo</option>
                                    <option value="Ready">Ready</option>
                                    <option value="InProgress">InProgress</option>
                                    <option value="Done">Done</option>
                                </Field>
                            </div>
                        </div>

                        <div className='row'>
                            <label htmlFor="description_value" className='col-4 my-2'>Description</label>
                            <Field name="description" type="textarea" className='col-8' required />
                        </div>

                        <div className='row'>
                            <div className='text-center my-4'>
                                <button type="submit" className='btn btn-success'>Add Task</button>
                            </div>
                        </div>
                        <br></br>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}

export default NewTask