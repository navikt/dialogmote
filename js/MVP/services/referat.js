import { get } from '../../data/gateway-api/gatewayApi';
import { ISDIALOGMOTE_API_BASE_URL } from '../globals/paths';

export const getReferatPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_URL}/${uuid}/pdf`;
  return get(url);
};

export const getReferatTest = async () => {
  const url =
    'https://isdialogmote.dev.intern.nav.no/api/v1/arbeidstaker/brev/499ec1c0-f755-4b51-85e9-76d96df6ea3b/pdf';

  const auth = {
    'Access-Control-Allow-Origin': '*',
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZ5akpfczQwN1ZqdnRzT0NZcEItRy1IUTZpYzJUeDNmXy1JT3ZqVEFqLXcifQ.eyJleHAiOjE2MjQ5MjM0MTQsIm5iZiI6MTYyNDkxOTgxNCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9uYXZ0ZXN0YjJjLmIyY2xvZ2luLmNvbS9kMzhmMjVhYS1lYWI4LTRjNTAtOWYyOC1lYmY5MmMxMjU2ZjIvdjIuMC8iLCJzdWIiOiIwMTEyOTAyMTc3OSIsImF1ZCI6IjAwOTBiNmUxLWZmY2MtNGMzNy1iYzIxLTA0OWY3ZDFmMGZlNSIsImFjciI6IkxldmVsNCIsIm5vbmNlIjoiSktJQi1sSE95REktSkZGdnlFa3hET1pIdjNGUHotaTJEZzZKako3RFFSQSIsImlhdCI6MTYyNDkxOTgxNCwiYXV0aF90aW1lIjoxNjI0OTE5ODEzLCJqdGkiOiJMdWFuLlRyYW5AbmF2Lm5vOmI2ZGY1MDY2LTY2OTEtNDNlMi1hOTY0LTY0MmM2ODI4MTE0ZSIsImF0X2hhc2giOiJobk84ZVVWSnhObERTOWFTWnpfOWt3In0.sKwIcQcMQn0mcufu1oCWvbN5guqekwTfsnCo0cCzIO9_NjEJ02Bu8u5iJFCZWk-_EKMdRXMoRK9ZhL3B5ztuEtUwGu05bPW3zFW3SN4NgBls4bOAFaX-M_MI7cYmeKKVnfySiwIyfsh1CGb_TD3d-dcg1y3hdVqn0SUsS8xefb_wtdqgziDbLhu3GgDMWnzw5OSEp_CbhyI27of3pEc3ye0NwZ4wjRpeWN0xj5506fqc2vxbRBfh0Oyyb6M2wtVAxWNX6JkpoRtTKtkOzOuXecMPqNbHlqXRYD_S7stwsouuNgGgzPY1Ui14e5Hslo49hs3nr6NGysinfP0aWVy3jw',
  };
  return get(url, auth);
};
