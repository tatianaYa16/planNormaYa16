import React, {SyntheticEvent} from "react";

import {
    Button as ButtonUI,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    PasswordInput as PasswordInputUI,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    Tab as TabUI,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Button: React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}> = ButtonUI;


export const PasswordInput: React.FC<{
    type:string;
    value: string;
    name: string;
    size?: "small" | "default" | undefined;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}>= PasswordInputUI;

export const Tab: React.FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}>= TabUI;
