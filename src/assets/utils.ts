// import React, { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, useCallback } from 'react';
//
// type PropsType = ChangeEvent<HTMLInputElement> & {
//   setValue: (value: string) => void
// }
//
// export const onChangeAttachAnswerImage: React.FC<PropsType> = ({setValue, e, ...restProps}) => {
//       const formData = new FormData();
//       const imgFile = e.target.files && e.target.files[0];
//       const reader = new FileReader();
//       if (imgFile) {
//         formData.append('imgFile', imgFile, imgFile.name);
//         reader.onloadend = () => props.setValue(reader.result as string);
//         reader.readAsDataURL(imgFile);
//       }
//     };