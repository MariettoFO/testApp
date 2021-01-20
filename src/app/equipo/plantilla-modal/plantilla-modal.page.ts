import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-plantilla-modal',
  templateUrl: './plantilla-modal.page.html',
  styleUrls: ['./plantilla-modal.page.scss'],
})
export class PlantillaModalPage implements OnInit {
 // uploadText: any;
  // downloadText: any;
  // fileTransfer: FileTransferObject;

  // constructor(private modalCtrl: ModalController, private transfer: FileTransfer, 
  //   private file: File, private filePath: FilePath, private fileChooser: FileChooser) { 
  //     this.uploadText = "";
  //     this.downloadText = "";
  //   }
  constructor(private modalCtrl: ModalController
    //,private imagePicker: ImagePicker
    ) { 
      
    }
// UploadFile(){
//   this.fileChooser.open().then((uri)=>{
//     this.filePath.resolveNativePath(uri).then(
//       (nativepath)=>{
//         this.fileTransfer = this.transfer.create();
//         let options : FileUploadOptions = {
//           fileKey: 'videofile',
//           fileName: 'video.mp4',
//           chunkedMode: false,
//           headers: {},
//           mimeType: 'video/mp4'
//         }
//         this.uploadText = "Subiendo...";
//         this.fileTransfer.upload(nativepath, 'tabs/partido', options).then((data)=>{
//           alert("transfer done = "+ JSON.stringify(data));
//           this.uploadText = "";
//         },(err)=>{
//           this.uploadText = "";
//         })
//       },(err)=>{
//         alert(JSON.stringify(err));
//       })
//   },(err)=>{
//     alert(JSON.stringify(err));
//   })
// }

// AbortUpload(){
//   this.fileTransfer.abort();
//   alert("Subida de archivo cancelada");
// }

@Input() equipo;
@Input() icono;
ngOnInit() {
}

// imagen(){
  
//   this.imagePicker.getPictures(options).then((results) => {
//     for (var i = 0; i < results.length; i++) {
//         console.log('Image URI: ' + results[i]);
//     }
//   }, (err) => { });
// }

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){
  this.modalCtrl.dismiss({
    equipo: 'CD San Roque',
    icono: 'hola'
  });

}
}