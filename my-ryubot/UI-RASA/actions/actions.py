from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, FollowupAction
import logging
import random

# Configuración del logger
logger = logging.getLogger(__name__)


class ValidateIntensidadEmocional(FormValidationAction):
    def name(self) -> Text:
        return "validate_intensidad_emocional"

    def validate_intensidad_emocional(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Valida que la intensidad emocional esté dentro de los valores permitidos."""
        if slot_value.lower() in ["leve", "moderado", "severo"]:
            return {"intensidad_emocional": slot_value.lower()}
        else:
            dispatcher.utter_message(text="Por favor, indica si la intensidad es leve, moderada o severa.")
            return {"intensidad_emocional": None}


class ValidateIntensidadCognitiva(FormValidationAction):
    def name(self) -> Text:
        return "validate_intensidad_cognitiva"

    def validate_intensidad_cognitiva(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Valida que la intensidad cognitiva esté dentro de los valores permitidos."""
        if slot_value.lower() in ["leve", "moderado", "severo"]:
            return {"intensidad_cognitiva": slot_value.lower()}
        else:
            dispatcher.utter_message(text="Por favor, indica si la intensidad es leve, moderada o severa.")
            return {"intensidad_cognitiva": None}


class ValidateIntensidadFisica(FormValidationAction):
    def name(self) -> Text:
        return "validate_intensidad_fisica"

    def validate_intensidad_fisica(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Valida que la intensidad física esté dentro de los valores permitidos."""
        if slot_value.lower() in ["leve", "moderado", "severo"]:
            return {"intensidad_fisica": slot_value.lower()}
        else:
            dispatcher.utter_message(text="Por favor, indica si la intensidad es leve, moderada o severa.")
            return {"intensidad_fisica": None}


class ValidateIntensidadConductual(FormValidationAction):
    def name(self) -> Text:
        return "validate_intensidad_conductual"

    def validate_intensidad_conductual(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Valida que la intensidad conductual esté dentro de los valores permitidos."""
        if slot_value.lower() in ["leve", "moderado", "severo"]:
            return {"intensidad_conductual": slot_value.lower()}
        else:
            dispatcher.utter_message(text="Por favor, indica si la intensidad es leve, moderada o severa.")
            return {"intensidad_conductual": None}


class ValidateTipoCrisis(FormValidationAction):
    def name(self) -> Text:
        return "validate_tipo_crisis"

    def validate_tipo_crisis(
            self,
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> Dict[Text, Any]:
        """Valida que el tipo de crisis esté dentro de los valores permitidos."""
        if slot_value.lower() in ["panico", "suicidio"]:
            return {"tipo_crisis": slot_value.lower()}
        else:
            dispatcher.utter_message(
                text="Por favor, indica si se trata de un ataque de pánico o pensamientos suicidas.")
            return {"tipo_crisis": None}


class ActionProtocoloSuicidio(Action):
    def name(self) -> Text:
        return "action_protocolo_suicidio"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Implementa el protocolo de manejo de crisis suicida."""
        # Mensaje de apoyo y validación
        dispatcher.utter_message(
            text="Gracias por confiar en mí con algo tan importante. Quiero que sepas que no estás solo/a en esto.")

        # Información sobre recursos de emergencia
        dispatcher.utter_message(
            text="Si estás teniendo pensamientos suicidas, por favor contacta inmediatamente con alguno de estos recursos:")
        dispatcher.utter_message(text="- Línea 106 (Línea de apoyo emocional en Bogotá)")
        dispatcher.utter_message(text="- Línea 123 (Emergencias en Colombia)")
        dispatcher.utter_message(text="- Acude al servicio de urgencias más cercano")

        # Recomendaciones de seguridad inmediata
        dispatcher.utter_message(text="Mientras tanto:")
        dispatcher.utter_message(text="1. No te quedes solo/a. Busca compañía de alguien de confianza.")
        dispatcher.utter_message(text="2. Retira de tu alcance objetos potencialmente peligrosos.")
        dispatcher.utter_message(text="3. Recuerda que los sentimientos intensos son temporales y pueden cambiar.")

        return []


class ActionAssessSymptomSeverity(Action):
    def name(self) -> Text:
        return "action_assess_symptom_severity"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Evalúa la severidad de los síntomas basado en la información proporcionada."""
        # Obtener sintomatología del usuario
        symptoms = []
        emotional = tracker.get_slot("has_emotional_symptoms")
        cognitive = tracker.get_slot("has_cognitive_symptoms")
        physical = tracker.get_slot("has_physical_symptoms")
        behavioral = tracker.get_slot("has_behavioral_symptoms")

        if emotional:
            symptoms.append("emocionales")
        if cognitive:
            symptoms.append("cognitivos")
        if physical:
            symptoms.append("físicos")
        if behavioral:
            symptoms.append("conductuales")

        # Determinar severidad basada en la cantidad de áreas afectadas
        severity = "leve"
        if len(symptoms) >= 3:
            severity = "severo"
        elif len(symptoms) >= 2:
            severity = "moderado"

        symptomatic_areas = ", ".join(symptoms)

        if symptoms:
            dispatcher.utter_message(
                text=f"Según lo que me has compartido, estás experimentando síntomas {symptomatic_areas}, lo cual sugiere un nivel de afectación {severity}.")
        else:
            dispatcher.utter_message(
                text="Aún no tengo suficiente información para evaluar tus síntomas. ¿Podrías contarme más sobre cómo te has estado sintiendo?")

        return [SlotSet("symptom_severity", severity)]


class ActionRecommendNextSteps(Action):
    def name(self) -> Text:
        return "action_recommend_next_steps"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Recomienda los próximos pasos basados en la severidad de los síntomas."""
        severity = tracker.get_slot("symptom_severity")

        if not severity:
            dispatcher.utter_message(
                text="Para poder recomendarte los mejores pasos a seguir, necesitaría saber más sobre tus síntomas.")
            return []

        if severity == "leve":
            dispatcher.utter_message(text="Basado en lo que me cuentas, te recomendaría:")
            dispatcher.utter_message(text="1. Incorporar técnicas de autocuidado en tu rutina diaria.")
            dispatcher.utter_message(text="2. Practicar técnicas de respiración o mindfulness.")
            dispatcher.utter_message(text="3. Mantener un diario de emociones para identificar patrones.")
            dispatcher.utter_message(
                text="4. Considera hablar con un profesional si los síntomas persisten más de dos semanas.")

        elif severity == "moderado":
            dispatcher.utter_message(text="Considerando tus síntomas, te sugiero:")
            dispatcher.utter_message(
                text="1. Buscar una consulta con un profesional de salud mental en las próximas semanas.")
            dispatcher.utter_message(
                text="2. Establecer una rutina diaria que incluya ejercicio y buenos hábitos de sueño.")
            dispatcher.utter_message(
                text="3. Practicar técnicas de manejo del estrés como la respiración profunda o meditación.")
            dispatcher.utter_message(text="4. Conectar con tu red de apoyo y compartir cómo te sientes.")

        elif severity == "severo":
            dispatcher.utter_message(text="Dada la intensidad de tus síntomas, te recomiendo prioritariamente:")
            dispatcher.utter_message(text="1. Buscar ayuda profesional lo antes posible, idealmente esta semana.")
            dispatcher.utter_message(
                text="2. Considerar opciones como líneas de ayuda o servicios de urgencia si sientes que la situación es crítica.")
            dispatcher.utter_message(text="3. No aislarte y buscar apoyo en personas de confianza.")
            dispatcher.utter_message(
                text="4. Seguir algunas técnicas básicas de autocuidado mientras consigues ayuda profesional.")

        dispatcher.utter_message(
            text="Recuerda que soy un asistente virtual y mis recomendaciones no reemplazan la orientación de un profesional de salud mental.")

        return []


class ActionResetSymptomSlots(Action):
    def name(self) -> Text:
        return "action_reset_symptom_slots"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Reinicia los slots relacionados con síntomas para una nueva evaluación."""
        return [
            SlotSet("has_emotional_symptoms", None),
            SlotSet("has_cognitive_symptoms", None),
            SlotSet("has_physical_symptoms", None),
            SlotSet("has_behavioral_symptoms", None),
            SlotSet("symptom_severity", None),
            SlotSet("symptom", None),
            SlotSet("symptom_type", None),
            SlotSet("duration", None)
        ]


class ActionAssessSymptomSeverity2(Action):
    def name(self) -> Text:
        return "action_assess_symptom_severity2"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Versión alternativa para evaluar severidad con un enfoque diferente."""
        # Obtener información sobre el síntoma principal y su duración
        symptom = tracker.get_slot("symptom")
        duration = tracker.get_slot("duration")

        # Pesos para diferentes factores
        symptom_weights = {
            "pensamientos suicidas": 10,
            "crisis": 9,
            "alucinaciones": 9,
            "paranoia": 8,
            "desesperanza": 7,
            "aislamiento": 6,
            "tristeza": 5,
            "ansiedad": 5,
            "insomnio": 5,
            "fatiga": 4,
            "preocupación": 3,
            "nerviosismo": 3
        }

        duration_weights = {
            "años": 3,
            "meses": 2,
            "semanas": 1,
            "días": 0.5
        }

        # Calcular puntuación
        symptom_score = 0
        if symptom:
            for key in symptom_weights:
                if key in symptom.lower():
                    symptom_score = max(symptom_score, symptom_weights[key])

        duration_score = 0
        if duration:
            for key in duration_weights:
                if key in duration.lower():
                    duration_score = duration_weights[key]
                    break

        total_score = symptom_score * (1 + duration_score * 0.5)

        # Determinar severidad
        if total_score >= 15:
            severity = "severo"
        elif total_score >= 8:
            severity = "moderado"
        else:
            severity = "leve"

        # Mensaje personalizado
        if symptom and 'suicid' in symptom.lower():
            return [SlotSet("symptom_severity", "severo"), FollowupAction("action_protocolo_suicidio")]

        if symptom:
            dispatcher.utter_message(
                text=f"He comprendido que estás experimentando {symptom}. Basado en lo que me cuentas, parece ser una situación de nivel {severity}.")
        else:
            dispatcher.utter_message(
                text="Necesito más información para evaluar adecuadamente tu situación. ¿Podrías contarme más sobre tus síntomas y desde cuándo los tienes?")

        return [SlotSet("symptom_severity", severity)]


class ActionPlanRecuperacion(Action):
    def name(self) -> Text:
        return "action_plan_recuperacion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Genera un plan básico de recuperación según los síntomas y tipo de trastorno."""
        trastorno = tracker.get_slot("trastorno")
        severity = tracker.get_slot("symptom_severity") or "moderado"  # Valor por defecto si no hay evaluación

        # Mensajes básicos para todos los planes
        dispatcher.utter_message(text="Aquí hay algunos pasos que podrían ayudarte en tu proceso de recuperación:")

        # Plan específico según tipo de trastorno
        if trastorno:
            if "ansiedad" in trastorno.lower():
                dispatcher.utter_message(text="Para ansiedad:")
                dispatcher.utter_message(text="1. Practica técnicas de respiración diafragmática")
                dispatcher.utter_message(text="2. Identifica y desafía pensamientos catastróficos")
                dispatcher.utter_message(text="3. Reduce el consumo de cafeína y estimulantes")
                dispatcher.utter_message(text="4. Establece una rutina de ejercicio moderado")

            elif "depres" in trastorno.lower():
                dispatcher.utter_message(text="Para depresión:")
                dispatcher.utter_message(text="1. Establece pequeñas metas diarias y celébralas")
                dispatcher.utter_message(text="2. Mantén un horario regular de sueño")
                dispatcher.utter_message(text="3. Busca exponerte a la luz natural diariamente")
                dispatcher.utter_message(
                    text="4. Intenta actividades que antes disfrutabas, aunque inicialmente no sientas motivación")

            elif "bipolar" in trastorno.lower():
                dispatcher.utter_message(text="Para trastorno bipolar:")
                dispatcher.utter_message(text="1. Mantén un registro diario de tu estado de ánimo")
                dispatcher.utter_message(text="2. Sigue una rutina estricta de sueño")
                dispatcher.utter_message(text="3. Reconoce las señales tempranas de cambios en tu estado de ánimo")
                dispatcher.utter_message(text="4. La adherencia al tratamiento es especialmente importante")

            elif "aliment" in trastorno.lower():
                dispatcher.utter_message(text="Para trastornos alimenticios:")
                dispatcher.utter_message(text="1. Trabaja con un equipo multidisciplinario (psicólogo, nutricionista)")
                dispatcher.utter_message(text="2. Establece patrones regulares de alimentación")
                dispatcher.utter_message(text="3. Practica la alimentación consciente")
                dispatcher.utter_message(text="4. Identifica los desencadenantes emocionales")

            elif "traum" in trastorno.lower() or "estres" in trastorno.lower() or "tept" in trastorno.lower():
                dispatcher.utter_message(text="Para trauma o estrés postraumático:")
                dispatcher.utter_message(text="1. Aprende técnicas de autorregulación emocional")
                dispatcher.utter_message(text="2. Practica el anclaje al presente cuando tengas flashbacks")
                dispatcher.utter_message(text="3. Construye gradualmente una red de seguridad y apoyo")
                dispatcher.utter_message(text="4. Sé paciente contigo mismo/a en el proceso")
        else:
            # Plan general si no se identifica un trastorno específico
            dispatcher.utter_message(
                text="1. Establece una rutina que incluya sueño regular, alimentación balanceada y ejercicio")
            dispatcher.utter_message(
                text="2. Practica técnicas de manejo del estrés como respiración profunda o meditación")
            dispatcher.utter_message(text="3. Mantente conectado/a con tu red de apoyo")
            dispatcher.utter_message(
                text="4. Limita el consumo de alcohol y sustancias que puedan empeorar los síntomas")

        # Recomendación según severidad
        if severity == "severo":
            dispatcher.utter_message(
                text="Dada la intensidad de tus síntomas, es importante que busques ayuda profesional lo antes posible.")
        else:
            dispatcher.utter_message(
                text="Recuerda que un profesional de salud mental puede darte un plan más personalizado según tus necesidades específicas.")

        return []


class ActionTecnicaGrounding(Action):
    def name(self) -> Text:
        return "action_tecnica_grounding"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Enseña la técnica de anclaje o grounding 5-4-3-2-1."""
        dispatcher.utter_message(
            text="La técnica de anclaje o 'grounding' puede ayudarte a reconectar con el presente cuando te sientas abrumado/a, ansioso/a o desconectado/a.")

        dispatcher.utter_message(text="Te enseñaré la técnica 5-4-3-2-1:")

        dispatcher.utter_message(
            text="1. Observa y nombra 5 cosas que puedas VER a tu alrededor. Nótalas conscientemente.")
        dispatcher.utter_message(
            text="2. Identifica 4 cosas que puedas TOCAR o SENTIR (como la textura de tu ropa, la brisa en tu piel).")
        dispatcher.utter_message(text="3. Reconoce 3 cosas que puedas ESCUCHAR (sonidos cercanos o lejanos).")
        dispatcher.utter_message(text="4. Nota 2 cosas que puedas OLER (o imagina olores que te agraden).")
        dispatcher.utter_message(
            text="5. Identifica 1 cosa que puedas SABOREAR (el sabor en tu boca o imagina un sabor agradable).")

        dispatcher.utter_message(
            text="Esta técnica te ayuda a redirigir la atención a tus sentidos y al momento presente, alejándote de pensamientos o emociones abrumadoras.")

        dispatcher.utter_message(text="Puedes practicarla en cualquier momento y lugar. ¿Te gustaría probarla ahora?")

        return []


class ActionRecomendarEjercicio(Action):
    def name(self) -> Text:
        return "action_recomendar_ejercicio"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Recomienda ejercicios adaptados a diferentes condiciones de salud mental."""
        # Obtener información sobre el trastorno o condición
        trastorno = tracker.get_slot("trastorno")
        severity = tracker.get_slot("symptom_severity") or "moderado"

        # Mensaje inicial
        dispatcher.utter_message(
            text="El ejercicio físico puede ser un gran aliado para la salud mental. Aquí algunas recomendaciones:")

        # Ejercicios generales buenos para la salud mental
        ejercicios_general = [
            "Caminar 30 minutos diarios, preferiblemente en la naturaleza o un parque",
            "Yoga suave, especialmente posturas que promueven la calma",
            "Estiramientos conscientes al despertar y antes de dormir",
            "Bailar con tu música favorita durante 15-20 minutos",
            "Natación a ritmo tranquilo"
        ]

        # Seleccionar ejercicios específicos según la condición
        if trastorno:
            if "ansiedad" in trastorno.lower():
                dispatcher.utter_message(
                    text="Para la ansiedad, estos ejercicios pueden ser especialmente beneficiosos:")
                dispatcher.utter_message(text="- Yoga o tai chi, que combinan movimiento con respiración consciente")
                dispatcher.utter_message(text="- Caminatas en la naturaleza a paso tranquilo")
                dispatcher.utter_message(text="- Ejercicios de estiramiento que liberan la tensión muscular")

            elif "depres" in trastorno.lower():
                dispatcher.utter_message(
                    text="Para la depresión, estos ejercicios pueden ayudar a activar neurotransmisores positivos:")
                dispatcher.utter_message(
                    text="- Ejercicio aeróbico de intensidad moderada como caminar rápido o trotar suave")
                dispatcher.utter_message(text="- Entrenamiento con pesas ligeras")
                dispatcher.utter_message(text="- Actividades grupales como clases de baile o deportes recreativos")

            elif "bipolar" in trastorno.lower():
                dispatcher.utter_message(
                    text="Para el trastorno bipolar, es importante la consistencia y evitar el sobreentrenamiento:")
                dispatcher.utter_message(text="- Rutinas moderadas y regulares como caminar, nadar o ciclismo")
                dispatcher.utter_message(text="- Yoga o pilates que promueven el equilibrio")
                dispatcher.utter_message(text="- Evitar ejercicio intenso durante episodios de manía")

            else:
                # Seleccionar aleatoriamente 3 ejercicios generales
                selected_exercises = random.sample(ejercicios_general, 3)
                for exercise in selected_exercises:
                    dispatcher.utter_message(text=f"- {exercise}")
        else:
            # Sin información específica, dar recomendaciones generales
            dispatcher.utter_message(text="Algunas recomendaciones generales:")
            for exercise in ejercicios_general[:3]:  # Mostrar solo 3 ejercicios
                dispatcher.utter_message(text=f"- {exercise}")

        # Consideraciones según severidad
        if severity == "severo":
            dispatcher.utter_message(
                text="Importante: Con síntomas severos, comienza con actividades muy suaves y de corta duración. Consulta con un profesional antes de iniciar una rutina de ejercicios.")
        elif severity == "moderado":
            dispatcher.utter_message(
                text="Consejo: Comienza con sesiones cortas (10-15 minutos) e incrementa gradualmente. La consistencia es más importante que la intensidad.")
        else:
            dispatcher.utter_message(
                text="Recuerda: Lo más importante es encontrar actividades que disfrutes y que puedas mantener regularmente.")

        dispatcher.utter_message(text="¿Te gustaría más información sobre alguno de estos ejercicios en particular?")

        return []


class ActionManejoIraPasos(Action):
    def name(self) -> Text:
        return "action_manejo_ira_pasos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        """Proporciona pasos para el manejo efectivo de la ira."""
        dispatcher.utter_message(
            text="El manejo de la ira es una habilidad que podemos desarrollar. Aquí te comparto algunos pasos que pueden ayudarte:")

        # Pasos inmediatos
        dispatcher.utter_message(text="Cuando sientas que la ira está surgiendo:")
        dispatcher.utter_message(
            text="1. DETENTE: Reconoce las señales físicas (tensión muscular, calor, respiración acelerada)")
        dispatcher.utter_message(text="2. RESPIRA: Toma 5 respiraciones profundas y lentas")
        dispatcher.utter_message(text="3. ALÉJATE: Si es posible, toma distancia temporal de la situación")

        # Estrategias a corto plazo
        dispatcher.utter_message(text="Para calmarte en el momento:")
        dispatcher.utter_message(text="- Cuenta lentamente hasta 10 (o hasta 100 si es necesario)")
        dispatcher.utter_message(text="- Utiliza frases de autocontrol: 'Puedo manejar esto', 'Mantén la calma'")
        dispatcher.utter_message(
            text="- Libera la tensión física de forma segura (aprieta una pelota antiestrés, camina)")

        # Estrategias a largo plazo
        dispatcher.utter_message(text="Para desarrollar mejor manejo de la ira con el tiempo:")
        dispatcher.utter_message(text="1. Identifica tus desencadenantes específicos")
        dispatcher.utter_message(text="2. Practica la comunicación asertiva (expresa tus necesidades sin agredir)")
        dispatcher.utter_message(text="3. Desarrolla habilidades de resolución de problemas")
        dispatcher.utter_message(text="4. Considera técnicas como mindfulness o meditación regular")
        dispatcher.utter_message(
            text="5. Busca apoyo profesional si sientes que la ira afecta significativamente tu vida")

        dispatcher.utter_message(
            text="¿Hay alguna situación específica relacionada con la ira en la que te gustaría profundizar?")

        return []