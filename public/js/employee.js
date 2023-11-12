$.get("http://127.0.0.1:3000/emp-training", (data, status) => {


    $('#training-table').DataTable({
        data: data,
        bLengthChange: false,
        columns: [
        { data: 'emp_id', title: 'Id' },
        { data: 'emp_training', title: 'Training Name' },
        { data: 'emp_start_date', title: 'Start' },
        { data: 'emp_end_date', title: 'end' }
        ]
    });

    
});
$.get("http://127.0.0.1:3000/emp-exam", (data, status) => {


    $('#marks-table').DataTable({
        data: data,
        bLengthChange: false,
        columns: [
        { data: 'subject', title: 'Subject' },
        { data: 'marks', title: 'Marks' },
        { data: 'date', title: 'Training' },

        ]
    });

    
});