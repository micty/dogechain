

module.exports = {
    parse($) { 
        let rows = $('#wrapper div.table-responsive>table>tbody>tr:gt(0)').toArray();

        // rows = rows.slice(1,2);

        let addresses = new Set();

        let transactions = rows.map((tr) => {
            let cells = $(tr).find('>td').toArray();
            
            //如：`/tx/71cff63ada6d55ec2eb9b4ecb5b3a25f45cd8b2e656a637ba4bad99ad2d93f97`
            let tx = $(cells[0]).find('>a').attr('href').slice(4);
            let fee = $(cells[1]).text().replace(/\s/g, '');

            let recipients = $(cells[2]).find('>a,>em').toArray().map((a) => {
                let addr = $(a).text().replace(/\s/g, '');

                if (addr != 'op_return' && addr != 'nonstandard') {
                    addresses.add(addr);
                }

                return addr;
            });

            let amounts = $(cells[3]).html().split('<br>').slice(0, -1).map((v) => {
                return v.replace(/,|\s/g, '');
            });

            return { tx, fee, recipients, amounts, };
        });

        addresses = [...addresses];

        return { transactions, addresses, };
   
    },
};