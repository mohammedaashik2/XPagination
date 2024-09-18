import React, { useState, useEffect } from 'react';

function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(employees.length / rowsPerPage);

    // Get current page data
    const currentPageData = employees.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{
                display: 'flex',
                justifyContent: 'center'
            }}>Employee Data Table</h1>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
                <thead style={{
                    backgroundColor: '#25be7d',
                    color: 'white'
                }}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '5px'
            }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    style={{
                        backgroundColor: '#25be7d',
                        color: 'white',
                        margin: '0 5px'
                    }}
                >
                    Previous
                </button>
                <button
                    style={{
                        backgroundColor: '#25be7d',
                        color: 'white',
                        margin: '0 5px'
                    }}
                >
                    {currentPage}
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    style={{
                        backgroundColor: '#25be7d',
                        color: 'white',
                        margin: '0 5px'
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmployeeTable;

