
import React,{useState, useEffect} from 'react'
import {Form, Input, message, Modal, Select, Table, DatePicker} from 'antd'
import {UnderlineOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Layout from '../component/layout/Layout'
import axios from 'axios';
import Spinner from '../component/Spinner';
import moment from 'moment';
import Analytics from '../component/Analytics';
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAlltransection] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [message, setMessage] = useState("")
  const [editable, setEditable] = useState(null)

  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-2' onClick={() => {handleDelete(record)}} />
        </div>
      )
    }
  ]

  //getall transaction
  const getAllTransection = async () =>{
    try {
      const user = JSON.parse(localStorage.getItem('uaer'))
      setLoading(true)
     const res = await axios.post('/transections/get-transection', {
      userid: user._id,
      frequency
    })
     setLoading(false)
     setAlltransection(res.data)
     console.log(res.data)
    }catch(error){
      console.log(error)
      message.error('fetch issue with transecion')
    }
  }

  // useEffect hook
  useEffect(() => {
    const getAllTransection = async () =>{
      try {
        const user = JSON.parse(localStorage.getItem('uaer'))
        setLoading(true)
       const res = await axios.post('/transections/get-transection', {
        userid: user._id,
        frequency,
        selectedDate,
      })
       setLoading(false)
       setAlltransection(res.data)
       console.log(res.data)
      }catch(error){
        console.log(error)
        message.error('fetch issue with transecion')
      }
    }
    getAllTransection();
  }, [frequency, selectedDate, type])
    //delete handler 
    const handleDelete = async (record) => {
      try{
        setLoading(true)
        await axios.post('/transections/delete-transection',{transactionId:record._id})
        setLoading(false)
        message.success('Transaction delete')
      }catch(error){
        setLoading(false)
        console.log(error)
        message.error('unable to delete')
      }
    }

  // form handling 
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        await axios.post('/transections/edit-transaction',{
          payload:{
            ...values,
            userId:user._id
          },
          transactionId:editable._id
        })
        setLoading(false)
        message.success('transaction updated successfully')
      }else{
        await axios.post('/transections/add-transaction', {...values, userid:user._id})
      setLoading(false)
      message.success('transaction updated successfully')
      }
      setShowModal(false)
      setEditable(null)
    }catch(error){
      setLoading(false)
      message.error('Failed to added transaction')
    }
  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
        
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => selectedDate(values)} />}
        </div>
        <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
              <Select.Option value="custom">CUSTOM</Select.Option>
             
        
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => selectedDate(values)} />}
        </div>
        <div className='switch-icons'>
            <UnderlineOutlined 
            className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
              onClick={() => setViewData('table')}
              />
            <AreaChartOutlined 
            className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('analytics')}
             />
          </div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button> <div>
        </div>
      </div>
      <div className='content'>
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransection} /> 
        : <Analytics allTransection={allTransection}/> }
        
      </div>
      <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form lang='vertical' onFinish={handleSubmit} initialValues={editable}>
          <Form.item lable="Amount" name="amount">
            <Input type='text' />
          </Form.item>
          <Form.itm lable="type" name="type">
            <Select>
              <Select.option value="income">Income</Select.option>
              <Select.option value="expense">Expense</Select.option>
            </Select>

          </Form.itm>
          <Form.itm lable="Category" name="category">
            <Select>
              <Select.option value="salary">Salary</Select.option>
              <Select.option value="tip">Tip</Select.option>
              <Select.option value="project">Project</Select.option>
              <Select.option value="food">Food</Select.option>
              <Select.option value="movie">Movie</Select.option>
              <Select.option value="bills">Bills</Select.option>
              <Select.option value="medical">Medical</Select.option>
              <Select.option value="fees">Fees</Select.option>
              <Select.option value="tax">Tax</Select.option>
            </Select>
          </Form.itm>
          <Form.item lable="Date" name="date">
            <Input type="date" />
          </Form.item>
          <Form.item lable="Reference" name="reference">
            <Input type="text" />
          </Form.item>
          <Form.item lable="Description" name="description">
            <Input type="text" />
          </Form.item>
          <div className='d-flex'>
            <button type='submit' className='btn btn-primary justify-content-end'>
              {" "}
              SAVE</button>

          </div>

        </Form>
      </Modal>
        </Layout>
  )
}

export default HomePage