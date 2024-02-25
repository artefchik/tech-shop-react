// import { classNames } from 'shared/lib/classNames/classNames';
// import { VStack } from 'shared/ui/Stack';
// import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
// import { Input } from 'shared/ui/Input/Input';
// import cls from './SignupForm.module.scss';
//
// interface SignupFormProps {
//     className?: string;
// }
//
// export const SignupForm = (props: SignupFormProps) => {
//     const { className } = props;
//
//     return (
//         <VStack gap="20" className={classNames(cls.SignupForm, {}, [className])}>
//             <Text
//                 size={TextSize.BIG}
//                 align={TextAlign.CENTER}
//                 text="Registration"
//                 As="h3"
//             />
//             <VStack>
//                 <VStack gap="15">
//                     <Input label="Username" onChange={onChangeEmail} value={email} />
//                     <Input label="Email" onChange={onChangeEmail} value={email} />
//                     <Input
//                         label="Password"
//                         onChange={onChangePassword}
//                         value={password}
//                     />
//                 </VStack>
//             </VStack>
//         </VStack>
//     );
// };
