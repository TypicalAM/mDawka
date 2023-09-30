"use client"
import React, { useEffect, useRef, useState } from 'react'
import Quagga from 'quagga';
import { BarcodeFormat, CodeResult } from '../../../types/BarcodeTypes';

export default function BarcodeReader() {
    const myRef = useRef(null);
    const [reader, setReader] = useState()

    useEffect(()=>{
        if(!myRef){
            return
        }
        const readerConf = Quagga.init({
            drawBoundingBox: true,
            locate: true,
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: myRef.current
            },
            decoder : {
              readers : [BarcodeFormat.EAN_READER]
            },
          }, function(err:any) {
              if (err) {
                  console.log(err);
                  return
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
          });
          // Quagga.onProcessed((data:any)=>console.log(data));
          Quagga.onDetected((processed: any)=>{
                const codeResult: CodeResult = processed.codeResult;
                //TODO Api call with codeResult
          })

        setReader(readerConf)
    },[])

  return (
    <div ref={myRef}></div>
  )
}
