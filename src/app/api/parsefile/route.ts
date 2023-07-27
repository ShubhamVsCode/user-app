import { NextResponse, NextRequest } from "next/server";
import readXlsxFile from "read-excel-file";

export async function POST(request: NextRequest) {
    const body = await request.json()

    const { file } = body;

    if (!file) {
        return NextResponse.json({
            message: "No file uploaded"
        })
    }

    try {
        const buffer = Buffer.from(file, 'base64');
        console.log(buffer)
        const workbook = await readXlsxFile(buffer);
        console.log(workbook)
        // const data = parse(file, { header: true }).data; // For CSV parsing
        const data = workbook[0]; // For Excel parsing
        console.log(data);
        return NextResponse.json(data)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error parsing the file' }, {
            status: 400
        });
    }

}

