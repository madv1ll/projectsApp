import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const generateExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
        ['Project Name', 'Project Test'],
        ['Project Price', 20000],
        ['Start Date', '01/01/2000'],
        ['Finish Date', '01/01/2001']
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Project xxx', true);
    const base64 = XLSX.write(wb, {type: 'base64'});
    const filename = FileSystem.documentDirectory + "Project_xxx.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
    }).then(()=>{
        Sharing.shareAsync(filename);
    });
};