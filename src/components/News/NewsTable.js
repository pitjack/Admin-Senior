import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router'
const categoryType = {
  0: 'Infromation news',
  1: 'KMUTT news',
};
const roleType = {
  0: 'All',
  1: 'คณะวิศวกรรมศาสตร์',
  2: 'คณะพลังงานและวัสดุ',
  3: 'คณะวิทยาศาสตร์',
  4: 'คณะครุศาสตร์อุตสาหกรรม',
  5: 'คณะทรัพยากรชีวภาพและเทคโนโลยี',
  6: 'คณะเทคโนโลยีสารสนเทศ',
  7: 'คณะสถาปัตยกรรมศาสตร์',
  8: 'คณะศิลปศาสตร์',
  9: 'บัณฑิตร่วมด้านพลังงานและสิ่งแวดล้อม',
  10: 'บัณฑิตวิทยาลัยการจัดการและนวัตกรรมร์',
  11: 'คณะสถาบันวิทยาการหุ่นยนต์ภาคสนาม',
};
function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

class NewsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BootstrapTable data={this.props.data}
        remote={true}
        pagination={true}
        search={true}
        multiColumnSearch={true}
        fetchInfo={{ dataTotalSize: this.props.totalDataSize }}
        deleteRow={true} selectRow={{ mode: 'checkbox' }}
        options={{
          sizePerPage: this.props.sizePerPage,
          sizePerPageList: [5, 10],
          page: this.props.currentPage,
          onPageChange: this.props.onPageChange,
          onSizePerPageList: this.props.onSizePerPageList,
          onSortChange: this.props.onSortChange,
          onFilterChange: this.props.onFilterChange,
          onSearchChange: this.props.onSearchChange,
          onDeleteRow: this.props.onDeleteRow,
          onExportToCSV: this.props.onExportToCSV,
          onRowClick: function (row) {
            if (confirm("Would you like to see news details?") == true) {
              alert(`You will go view detail of ${row.news_title}. `);
                         browserHistory.push('#/News/Detail');
                         location.reload();
            } else {
              alert(`You cancel.`);
            }
          }
        }}>
        <TableHeaderColumn dataField='_id' isKey={true} filter={{ type: 'TextFilter' }} dataSort>NewsId</TableHeaderColumn>
        <TableHeaderColumn dataField='news_title' filter={{ type: 'TextFilter' }} dataSort>Title News</TableHeaderColumn>
        <TableHeaderColumn dataField='category' filterFormatted dataFormat={enumFormatter} formatExtraData={categoryType} filter={{ type: 'SelectFilter', options: categoryType }} dataSort>Category News</TableHeaderColumn>
        <TableHeaderColumn dataField='news_role' filterFormatted dataFormat={enumFormatter} formatExtraData={roleType} filter={{ type: 'SelectFilter', options: roleType }} dataSort>Role</TableHeaderColumn>
        <TableHeaderColumn dataField='updated_at' filter={{ type: 'DateFilter' }} dataSort>Relese date</TableHeaderColumn>
        <TableHeaderColumn dataField='views' dataSort>Views</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default NewsTable