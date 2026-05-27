import React from "react";
import { Alert, Card, Tag, Typography } from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    QuestionCircleOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import "./style/helppage.css";

const { Title, Paragraph, Text } = Typography;

const quickStartItems = [
    {
        title: "Проверьте себя в списке сотрудников",
        text: "На главной странице отображается текущий статус: в офисе, вне офиса, в командировке, отпуске или другом согласованном состоянии.",
    },
    {
        title: "Следите за отметками входа и выхода",
        text: "Если система не видит сегодняшнюю отметку, она предупредит об этом. Так проще вовремя заметить забытый проход через СКУД.",
    },
    {
        title: "Оформляйте заявки заранее",
        text: "Командировки, отпуска, больничные и другие отсутствия фиксируются заявками, чтобы руководители и отделы видели актуальный план.",
    },
    {
        title: "Проверяйте расчетный лист",
        text: "Через меню пользователя можно открыть расчетный лист и сверить данные, которые связаны с рабочим временем и начислениями.",
    },
];

const workSections = [
    {
        icon: <TeamOutlined />,
        title: "Список сотрудников",
        description: "Основная рабочая область показывает сотрудников, их подразделения, графики и текущие состояния.",
        points: [
            "быстрый поиск себя или коллеги;",
            "просмотр статуса на сегодня;",
            "переход к дополнительной информации по сотруднику;",
            "отображение заявок и событий, влияющих на рабочий день.",
        ],
    },
    {
        icon: <FileTextOutlined />,
        title: "Заявки",
        description: "Заявки нужны, чтобы заранее согласовать отсутствие или особый режим работы.",
        points: [
            "создание заявки на нужный период;",
            "проверка статуса согласования;",
            "возврат или редактирование заявки, если это доступно по правам;",
            "просмотр общего списка своих заявок.",
        ],
    },
    {
        icon: <ClockCircleOutlined />,
        title: "События СКУД",
        description: "События помогают понять, какие отметки входа и выхода зафиксировала система.",
        points: [
            "контроль фактического присутствия;",
            "поиск пропущенных или спорных отметок;",
            "сверка данных за день перед обращением к ответственным сотрудникам.",
        ],
    },
    {
        icon: <CalendarOutlined />,
        title: "Графики и календари",
        description: "Графики определяют ожидаемое рабочее время, выходные и производственные дни.",
        points: [
            "просмотр назначенного графика;",
            "понимание рабочих, выходных и праздничных дней;",
            "учет смен, гибких графиков и особых правил подразделения.",
        ],
    },
];

const employeeTips = [
    "Перед началом работы убедитесь, что в системе правильно отображаются ваши фамилия, имя и подразделение.",
    "Если пришли в офис, приложите карту на входе. При уходе из офиса также приложите карту на выходе.",
    "Если планируете отсутствовать, создайте заявку до начала периода отсутствия.",
    "Если увидели ошибку в статусе или времени, сначала проверьте события СКУД за нужный день.",
    "По вопросам согласования обращайтесь к руководителю, по техническим проблемам - к ответственному за систему.",
];

const HelpPage = () => (
    <main className="sk-help-page">
        <section className="sk-help-hero">
            <div>
                <Tag color="blue" className="sk-help-hero-tag">Справка для сотрудников</Tag>
                <Title level={1}>Как работать с программой учета времени</Title>
                <Paragraph>
                    Эта страница поможет быстро понять, зачем нужна система, какие данные в ней отображаются
                    и какие действия ожидаются от сотрудника в обычный рабочий день.
                </Paragraph>
            </div>
            <div className="sk-help-hero-panel" aria-label="Краткая схема работы">
                <div>
                    <CheckCircleOutlined />
                    <span>Отметка в офисе</span>
                </div>
                <div>
                    <FileTextOutlined />
                    <span>Заявка при отсутствии</span>
                </div>
                <div>
                    <CalendarOutlined />
                    <span>График и календарь</span>
                </div>
            </div>
        </section>

        <section className="sk-help-section">
            <Title level={2}>Быстрый старт</Title>
            <div className="sk-help-steps">
                {quickStartItems.map((item, index) => (
                    <Card key={item.title} className="sk-help-step-card">
                        <div className="sk-help-step-number">{index + 1}</div>
                        <Title level={4}>{item.title}</Title>
                        <Paragraph>{item.text}</Paragraph>
                    </Card>
                ))}
            </div>
        </section>

        <section className="sk-help-section">
            <Title level={2}>Основные разделы</Title>
            <div className="sk-help-feature-grid">
                {workSections.map((section) => (
                    <Card key={section.title} className="sk-help-feature-card">
                        <div className="sk-help-feature-title">
                            <span className="sk-help-feature-icon">{section.icon}</span>
                            <Title level={3}>{section.title}</Title>
                        </div>
                        <Paragraph>{section.description}</Paragraph>
                        <ul>
                            {section.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </section>

        <section className="sk-help-section sk-help-two-columns">
            <Card className="sk-help-guidance-card">
                <Title level={2}>Что важно помнить</Title>
                <ul className="sk-help-check-list">
                    {employeeTips.map((tip) => (
                        <li key={tip}>
                            <CheckCircleOutlined />
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card className="sk-help-guidance-card">
                <Title level={2}>Если что-то не сходится</Title>
                <Paragraph>
                    Ошибка в статусе обычно связана с отсутствующей отметкой, несогласованной заявкой
                    или графиком, который еще не обновили.
                </Paragraph>
                <Alert
                    type="info"
                    showIcon
                    icon={<QuestionCircleOutlined />}
                    message="Перед обращением подготовьте дату, примерное время события и описание проблемы."
                />
                <Paragraph className="sk-help-muted">
                    Так ответственному сотруднику будет проще быстро проверить данные и подсказать следующий шаг.
                </Paragraph>
            </Card>
        </section>

        <section className="sk-help-section sk-help-final-note">
            <Text strong>Главная идея:</Text>
            <span>
                система помогает видеть рабочее время, отсутствия и согласования в одном месте.
                Чем аккуратнее внесены отметки и заявки, тем меньше ручных уточнений в конце периода.
            </span>
        </section>
    </main>
);

export default HelpPage;
