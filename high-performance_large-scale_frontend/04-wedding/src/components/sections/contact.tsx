import Accordion from '@shared/Accordion'
import Section from '@shared/Section'
import classNames from 'classnames/bind'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './Contact.module.scss'
import { Person, Wedding } from '@/models/wedding'

const cx = classNames.bind(styles)

export default function Contact({
  groom,
  bride,
}: {
  groom: Wedding['groom']
  bride: Wedding['bride']
}) {
  return (
    <Section title="연락처 및 마음을 전하실 곳">
      <Accordion label={'신랑측'}>
        <ContactInfo
          name={groom.name}
          account={groom.account}
          phoneNumber={groom.phoneNumber}
        />
        {groom.parents.map((item) => (
          <ContactInfo
            key={item.phoneNumber}
            name={item.name}
            account={item.account}
            phoneNumber={item.phoneNumber}
          />
        ))}
      </Accordion>
      <Accordion label={'신부측'}>
        <ContactInfo
          name={bride.name}
          account={bride.account}
          phoneNumber={bride.phoneNumber}
        />
        {bride.parents.map((item) => (
          <ContactInfo
            key={item.phoneNumber}
            name={item.name}
            account={item.account}
            phoneNumber={item.phoneNumber}
          />
        ))}
      </Accordion>
    </Section>
  )
}

function ContactInfo({ name, account, phoneNumber }: Person) {
  return (
    <div className={cx('wrap-contact')}>
      {/* 정보 */}
      <div className={cx('wrap-contact-info')}>
        <span>{`${account.bankName} | ${account.accountNumber}`}</span>
        <span>{name} </span>
      </div>

      {/* 버튼 */}
      <ul className={cx('wrap-buttons')}>
        <li>
          <a className={cx('button')} href={`tel: ${phoneNumber}`}>
            전화
          </a>
        </li>
        <li>
          <CopyToClipboard
            text={`${account.bankName} ${account.accountNumber}`}
            onCopy={() => {
              alert('복사가 완료 되었습니다.')
            }}
          >
            <button type="button" className={cx('button')}>
              복사
            </button>
          </CopyToClipboard>
        </li>
        {account.kakaopayLink != null ? (
          <li>
            <a
              href={account.kakaopayLink}
              className={cx('button')}
              target="_blank"
              rel="noreferrer"
            >
              송금
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
