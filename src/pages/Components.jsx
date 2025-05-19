import React from 'react';
import { Typography } from '../components/Typography';
import { HomeIcon, HelpIcon, SuccessIcon, ErrorIcon, ArrowRightIcon, CrossIcon, ArrowLeftIcon, MenuIcon, EditIcon, DropdownIcon, BellIcon, PinIcon, DownloadIcon, BarChartIcon, InboxIcon, FilterIcon, MapIcon, ZapIcon, ShareIcon, CreditCardIcon, SearchIcon, UserIcon, CalendarIcon, EyeIcon, ClosedEyeIcon, HeartIcon, AnalyzeIcon, ChatIcon, ResultIcon, XIcon, InstagramIcon, FacebookIcon, TiktokIcon, Icon, CaretRightIcon } from '../components/Icon';

export function Components() {
    return (
        <>
            <div>components</div>

            <Typography component='h1' font_family='Montserrat' >
                Montserrat
            </Typography>

            <Typography component='p' font_family='Roboto'>
                Montserrat
            </Typography>

            <Typography component='small' font_family='DM Sans' >
                Montserrat
            </Typography>
            <div>
                <Icon name="home" size={20} />
                <HomeIcon size={40} /><HelpIcon size={40} /><SuccessIcon color={"var(--color-mint-green)"} size={40} /><ErrorIcon size={40} color={"var(--color-error-red)"} /><ArrowRightIcon size={40} />
                <CrossIcon size={40} /><ArrowLeftIcon size={40} /><MenuIcon size={40} /><EditIcon size={40} /><DropdownIcon size={40} />
                <BellIcon size={40} /><PinIcon size={40} /><DownloadIcon size={40} /><BarChartIcon size={40} /><InboxIcon size={40} />
                <FilterIcon size={40} /><MapIcon size={40} /><ZapIcon size={40} /><ShareIcon size={40} /><CreditCardIcon size={40} />
                <SearchIcon size={40} /><UserIcon size={40} /><CalendarIcon size={40} /><EyeIcon size={40} /><ClosedEyeIcon size={40} />
                <HeartIcon size={40} /><CaretRightIcon size={40} /><AnalyzeIcon size={40} /><ChatIcon size={40} /><ResultIcon size={40} /><XIcon size={40} />
                <InstagramIcon size={40} /><FacebookIcon size={40} /><TiktokIcon size={40} />
            </div>

        </>
    )
}
