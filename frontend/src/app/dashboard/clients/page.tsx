import React from 'react'
import PageHeader from '@/components/PageHeader'
import TableBuilder from '@/components/TableBuilder'
import clients from '@/data/clients.json'

// type ClientRow = {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
// }   

const ClientsPage = () => {
    // const columns = [
    //     {
    //         key: 'name',
    //         label: 'Name',
    //     },
    // ]
    console.log(clients);
  return (
    <div className='nt-page nt-clients'>
      <PageHeader title="Clients" />
      <div className='nt-page-content'>
        <div className='nt-page-content-header'>
          <h1 className='nt-page-content-header-title'>Clients</h1>
        </div>
        <div className='nt-page-content-body'>
            {/* <TableBuilder /> */}
        </div>
      </div>
    </div>
  )
}

export default ClientsPage