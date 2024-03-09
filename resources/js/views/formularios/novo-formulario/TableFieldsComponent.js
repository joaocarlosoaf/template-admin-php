import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from "@coreui/react";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const TableFieldsComponent = (props) => {
    
    let stepIndex = props.stepIndex;
    let listFields = props.listFields;
    let removeField = props.removeField;


    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'name',
            label: 'Nome',
            _props: { scope: 'col' },
        },
        {
            key: 'label',
            label: 'Label',
            _props: { scope: 'col' },
        },
        {
            key: 'type',
            label: 'Tipo',
            _props: { scope: 'col' },
        },
        {
            key: 'required',
            label: 'Obrigatório',
            _props: { scope: 'col' },
        },
        {
            key: 'action',
            label: 'Ações',
            _props: { scope: 'col' },
        },
    ];


    const showOptions = (field) => {
        Swal.fire(
            'Opçoes do campo:',
            field.options
        );
    }

    
    const deleteField = (index) => {
        Swal.fire({
            title: 'Confirma?',
            text: "O campo será deletado desta etapa da inscrição!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                removeField(stepIndex, index);
                Swal.fire(
                    'Deletado!',
                    'O campo foi deletado.',
                    'success'
                )
            }
        });
    }


    return (
        <CTable columns={columns}>
            <CTableBody>
                {listFields.map((field, index) => {
                    return (
                        <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                            <CTableDataCell>{field.name}</CTableDataCell>
                            <CTableDataCell>{field.label}</CTableDataCell>
                            <CTableDataCell>{field.type}</CTableDataCell>
                            <CTableDataCell>{(field.required)? 'Sim' : 'Não'}</CTableDataCell>
                            <CTableDataCell>
                                {/* <CTooltip content="Tooltip text">
                                    <a href="#" onClick={() => {event.preventDefault(); showOptions(field)}}>
                                    <FontAwesomeIcon role="button" style={{ marginRight: '2pt' }}
                                    className="mr-2" icon={faEye}/>
                                    </a>
                                                                            
                                </CTooltip>
                                <CTooltip content="Tooltip text">
                                    <FontAwesomeIcon role="button" style={{ marginRight: '2pt' }} className="mr-2" icon={faPenToSquare} />
                                </CTooltip> */}
                                <CTooltip content="Tooltip text">
                                    <a href="#" onClick={() => {event.preventDefault(); deleteField(index)}}>
                                        <FontAwesomeIcon role="button" color="red" style={{ marginRight: '2pt' }} className="mr-2" icon={faTrash} />
                                    </a>
                                </CTooltip>
                            </CTableDataCell>
                        </CTableRow>
                    )
                })}
            </CTableBody>
        </CTable>
    )
    

}


export default TableFieldsComponent